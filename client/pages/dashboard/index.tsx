/**
 * Dashboard page used to add events manually to the database.
 */

import EventForm from "../../src/components/dashboard/EventForm";
import EventList from "../../src/components/dashboard/EventList";
import { Event, Host } from "../../lib/types";
import { DatabaseService } from "../../lib/db.service";
import { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import Header from "../../src/components/Header";

export async function getServerSideProps() {
  return {
    props: {
      hosts: await new DatabaseService().getHosts()
    },
  };
}

export default function Dashboard({ hosts }: { hosts: Host[] }) {

  const defaultEvent: Event = {
    id: "",
    title: "",
    host: "",
    date: "",
    link: ""
  }

  const [eventList, setEventList] = useState<Event[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<Event>(defaultEvent);

  async function updateEventList() {
    const response = await fetch("/api/events/getall");

    let newEvents: Event[] = [
      {
        title: "Can't show events, user not logged in",
        link: '-',
        date: '-',
        host: '-',
        id: '-'
      }
    ]
    if (response.ok) newEvents = await response.json();

    setEventList(newEvents);
  }

  async function deleteEvent(id: string, host: string) {
    await fetch("/api/events/delete", {
      method: "POST",
      body: JSON.stringify({
        id: id,
        host: host,
      }),
    });

    updateEventList();
  }

  async function beginEditEvent(event: Event) {
    setCurrentEvent(event);
    setIsOpen(true);
    return;
  }

  async function addEvent(event: Event) {
    const response = await fetch("/api/events/add", {
      method: "POST",
      body: JSON.stringify({
        id: "dummy", // Its deleted in the database service class function and then autogenerated by mongodb
        title: event.title,
        host: event.host,
        date: event.date,
        link: event.link,
        eventImageUrl: event.eventImageUrl,
        location: event.location
      })
    });

    updateEventList();
    return response;
  }

  async function editEvent(event: Event) {
    const response = await fetch("/api/events/edit", {
      method: "POST",
      body: JSON.stringify({
        id: event.id,
        title: event.title,
        host: event.host,
        date: event.date,
        link: event.link,
        eventImageUrl: event.eventImageUrl,
        location: event.location
      })
    });

    updateEventList();
    setIsOpen(false);
    return response;
  }

  useEffect(() => {
    updateEventList()
  }, [])

  return (
    <div>
      <Header />
      <div className="grid place-items-center">
        <div className="max-w-screen-xl w-full">
          <div className="flex flex-col md:flex-row w-full gap-4 mt-6">

            <div className="md:w-1/3 h-full w-full">
              <span className="flex text-xl font-bold border-b-2 w-full border-black">Add event</span>
              <EventForm updateEventList={updateEventList} hosts={hosts} event={defaultEvent} onSubmit={addEvent} />
            </div>

            <div className="md:w-2/3 h-full w-full">
              <span className="flex text-xl font-bold border-b-2 w-full border-black">Events</span>
              <EventList events={eventList} deleteHandler={deleteEvent} editHandler={beginEditEvent} />
            </div>

          </div>
        </div>
      </div>
      <Dialog className="fixed flex inset-0 z-50 bg-gray-700 bg-opacity-80 place-items-center justify-center" open={isOpen} onClose={() => setIsOpen(false)}>
        <Dialog.Panel className="bg-gray-100 p-4 rounded-xl md:w-1/3 w-5/6">
          <Dialog.Title>Editing event</Dialog.Title>
          <EventForm hosts={hosts} event={currentEvent} updateEventList={updateEventList} onSubmit={editEvent} />
        </Dialog.Panel>
      </Dialog>
    </div>
  )
}