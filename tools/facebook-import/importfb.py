# This is a script for putting facebook events into a mongoDB database. Put the
# html file of a downloaded event page (facebook.com/pg/{group}/events in ./data
# named as {host}.html and then run this script with the host as an argument.
import sys
import os
from datetime import datetime
from dotenv import load_dotenv
from bs4 import BeautifulSoup

def parse_date(datestr):
    datestr = datestr.strip() + "00"
    dateobj = datetime.strptime(datestr, "%b %d %a %I:%M %p %Z%z")
    return(str(dateobj.replace(year=int(datetime.today().year))))

load_dotenv("../../client/.env.local")

DB_URI = os.getenv("MONGODB_URI")
if (DB_URI is None):
    raise ValueError("Please specify MONGODB_URI in .env.local in Nextjs client folder or set an environment variable.")

if len(sys.argv) > 1:
    host = sys.argv[1]
else:
    raise ValueError("Please give an argument for the name of the file in /data folder")

with open("./data/" + host + ".html") as html_doc:
    soup = BeautifulSoup(html_doc, "html.parser")

upcoming_events = soup.find("div", {"id": "upcoming_events_card"})

upcoming_events = upcoming_events.find_all("div", {"class": "_24er"})

events = []

for event in upcoming_events:
    eventDict = {}
    
    eventDict["title"] = event.find("span", {"class": "_50f7"}).string.strip()
    
    dateString = ""
    for child in event.find("td", {"class": "_5px7 _51m-"}).span:
        dateString += child.string + " "
    dateString += event.find("div", {"class": "_4dml fsm fwn fcg"}).span.string.strip()
    eventDict["date"] = parse_date(dateString.strip())
    
    eventDict["link"] = event.a.get("href")
    
    eventDict["host"] = host
    
    loc1 = event.find("div", {"class": "_30n-"}).a
    if (loc1 is None): #The name is in an <a> tag if there is a link, otherwise span
        loc1 = event.find("div", {"class": "_30n-"}).span
    loc1 = loc1.string.strip()
    loc2 = event.find("div", {"class": "_30n_"}).text.strip()
    
    if loc2 == "":
        eventDict["location"] = loc1
    else:
        eventDict["location"] = loc1 + ", " + loc2
    
    events.append(eventDict)

print(events)