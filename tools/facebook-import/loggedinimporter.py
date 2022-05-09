# This is a script for putting facebook events into a mongoDB database.
# Make sure to be logged in and have the language set to english.
# Argument is the html file, if you want the image links to work
# you need to make sure to download the html file with the right
# src attribute. If you just save a website some brwosers change
# the links to local files. I use firefox, f12 -> right click tag
# and save outer html.

import sys
import os
from datetime import datetime, timedelta
from dotenv import load_dotenv
from bs4 import BeautifulSoup
from pymongo import MongoClient
import calendar
import time

# This is for HTML chars that get escaped when saving the file.
def unescape(s):
    s = s.replace("&lt;", "<")
    s = s.replace("&gt;", ">")
    # this has to be last:
    s = s.replace("&amp;", "&")
    return s

def nextDay(x):
    today = datetime.today()
    return(today + timedelta((x-today.weekday()) % 7))

def parse_date(datestr):
    datestr = datestr.strip()
    if datestr.lower() == "happening now":
        return "now"
    if datestr.lower().split()[-1] == "more": # Remove and x more
        datestr = " ".join(datestr.lower().split()[:-3])
    if datestr.lower()[:4] == "this":
        datestr = datestr.lower()[5:].strip()
        weekday = datestr.split()[0]
        days = dict(zip(map(lambda x: x.lower(), calendar.day_name), range(7))); 
        date = nextDay(days[weekday]).strftime("%Y-%m-%d")
        time = " ".join(datestr.split()[-2:])
        datestr = date + " " + time
        dateobj = datetime.strptime(datestr, "%Y-%m-%d %I %p")
        return(str(dateobj))
    try:
        dateobj = datetime.strptime(datestr, "%a, %b %d, %Y AT %I:%M %p")
        return(str(dateobj))
    except ValueError:
        pass
    try:
        dateobj = datetime.strptime(datestr, "%a, %b %d, %Y AT %I %p")
        return(str(dateobj))
    except ValueError:
        pass
    try:
        dateobj = datetime.strptime(datestr, "%a, %b %d AT %I %p")
        return(str(dateobj.replace(year=int(datetime.today().year))))
    except ValueError:
        pass
    try:
        dateobj = datetime.strptime(datestr, "%a, %b %d AT %I:%M %p")
        return(str(dateobj.replace(year=int(datetime.today().year))))
    except ValueError:
        pass
    try:
        # This is the events that have a start and end date, I haven't been able to verify
        # if this one wroks.
        dateobj = datetime.strptime(datestr[:6], "%b %d")
        return(str(dateobj.replace(year=int(datetime.today().year))))
    except ValueError:
        pass
    raise ValueError("Unable to parse date")

#Loads the .env.local file from the nextJS app.
load_dotenv("../../client/.env.local")

DB_URI = os.getenv("MONGODB_URI")
if (DB_URI is None):
    raise ValueError("Please specify MONGODB_URI in .env.local in Nextjs client folder or set an environment variable.")

DB_NAME = os.getenv("MONGODB_DB")
if (DB_NAME is None):
    raise ValueError("Please specify MONGODB_DB in .env.local in Nextjs client folder or set an environment variable.")

if len(sys.argv) > 1:
    file = sys.argv[1]
else:
    raise ValueError("Please specify a file as an argument.")

with open(file) as html_doc:
    soup = BeautifulSoup(html_doc, "html.parser")
    
# There are two divs with this class, upcoming events and passed events, but upcoming is first.
upcoming_events = soup.find("div", {"class": "dati1w0a ihqw7lf3 hv4rvrfc discj3wi"})

upcoming_events = upcoming_events.find_all("div", {"class": "rq0escxv l9j0dhe7 du4w35lb j83agx80 pfnyh3mw i1fnvgqd bp9cbjyn owycx6da btwxx1t3 hv4rvrfc dati1w0a f10w8fjw pybr56ya o22cckgh fop5sh7t obtkqiv7 sv5sfqaa"})

events = []

for event in upcoming_events:
    eventDict = {}
    
    name_tag = event.find("a", {"class": "oajrlxb2 g5ia77u1 qu0x051f esr5mh6w e9989ue4 r7d6kgcz rq0escxv nhd2j8a9 nc684nl6 p7hjln8o kvgmc6g5 cxmmr5t8 oygrvhab hcukyx3x jb3vyjys rz4wbd8a qt6c0cv9 a8nywdso i1ao9s8h esuyzwwr f1sip0of lzcic4wl gmql0nx0 gpro0wi8 hnhda86s"})
    eventDict["title"] = name_tag.span.text.strip()
    eventDict["link"] = unescape(name_tag["href"].strip())
    eventDict["date"] = parse_date(event.find("span", {"class": "d2edcug0 hpfvmrgz qv66sw1b c1et5uql b0tq1wua a8c37x1j fe6kdd0r mau55g9w c8b282yb keod5gw0 nxhoafnm aigsh9s9 tia6h79c iv3no6db e9vueds3 j5wam9gi lrazzd5p jdix4yx3 hzawbc8m"}).text.strip())
    host_location = event.find("span", {"class": "d2edcug0 hpfvmrgz qv66sw1b c1et5uql b0tq1wua a8c37x1j fe6kdd0r mau55g9w c8b282yb keod5gw0 nxhoafnm aigsh9s9 tia6h79c hrzyx87i a5q79mjw g1cxx5fr b1v8xokw oo9gr5id hzawbc8m"}).text.strip()
    (host, location) = host_location.strip().rsplit(" - ", 1)
    eventDict["host"] = host.strip()
    eventDict["location"] = location.strip()
    eventDict["eventImageUrl"] = unescape(event.find("img", {"class": "k4urcfbm bixrwtb6 datstx6m q9uorilb"})["src"].strip())
    

    events.append(eventDict)

client = MongoClient(DB_URI)
database = DB_NAME
collection=client[database].events

#This is probably not optimal since it has to search the database and then insert
#for every event. An alternative would be to generate an ID from the date and
#name or something similar.
total_events = len(events)
inserted = 0

all_db_events = collection.find({})
for event in events:
    # This is because there is no date info when the event is "happening now".
    # I'm not happy with the solution but can't see an alternative.
    if event["date"] == "now":
        event["date"] = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        already_registered = False
        for db_event in all_db_events:
            time_delta = datetime.strptime(db_event["date"], "%Y-%m-%d %H:%M:%S") - datetime.now()
            if abs(time_delta.days) < 21:
                already_registered = True
                break
        if already_registered:
            continue
    if len(list(collection.find(event))) == 0:
        print("Do you want to insert: " + str(event) + "?")
        while True:
            userinput = input("Y/N: ")
            if userinput.lower() == "y":
                collection.insert_one(event)
                inserted += 1
                break
            if userinput.lower() == "n":
                break

print("Total events: " + str(total_events))
print("Events already in database: " + str(total_events-inserted))
print("Events added: " + str(inserted))