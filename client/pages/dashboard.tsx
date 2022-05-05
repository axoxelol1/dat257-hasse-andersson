/**
 * Dashboard page used to add events manually to the database.
 */

import EventForm from "../src/components/EventForm";
import EventList from "../src/components/EventList";
import { Event } from "../lib/types";
import { DatabaseService } from "../lib/db.service";
import { useState } from "react";
import { Logotype } from "../src/components/Logotype";

export async function getServerSideProps() {
  return {
    props: {
      events: await new DatabaseService().getEvents(),
    },
  };
}

export default function Dashboard ({ events } : {events : Event[]}) {

  const [eventList, setEventList] = useState(events);
  
  async function updateEventList() {
    const result = await fetch("/api/events/getall");
    const newEvents : Event[] = await result.json();

    setEventList(newEvents);
  }

  async function deleteEvent(id: string) {
    await fetch("/api/events/delete", {
      method: "POST",
      body: JSON.stringify({
        id: id,
      }),
    });

    updateEventList();
  }

  async function editEvent(event: Event) {
    console.log("Editing event: "+event.id);
    return;
  } 

  return (
    <div className="grid place-items-center">
      <div className="p-8 max-w-screen-xl w-full">
        <Logotype/>
        <div className="flex flex-col md:flex-row w-full gap-4 mt-6">
          <EventForm updateEventList={updateEventList}/>
          <EventList events={eventList} deleteHandler={deleteEvent} editHandler={editEvent}/>
        </div>
      </div>
    </div>
  )
}