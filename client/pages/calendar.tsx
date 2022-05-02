import { useState } from "react";
import { DataService } from "../lib/data.service";
import { DatabaseService } from "../lib/db.service";
import { Host, Event } from "../lib/types"
import { Month } from "../src/components/calendar/Month";

/**
 * This function runs in the backend and is used to fetch the events from the data sources.
 */
 export async function getServerSideProps() {
  return {
    props: {
      events: await new DataService().getEvents(),
      hosts: await new DatabaseService().getHosts()
    },
  };
}

export default function Calendar({events, hosts }: { events: Event[], hosts: Host[] }) {
  const [date, setDate] = useState(new Date());

  const nextMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
  };
  
  return (
    <>
      <div>
        <h1 className="text-6xl font-semibold">
          Calendar
        </h1>
      </div>
      <div className="flex justify-center">
        <div className="flex flex-col">
          <div className="flex justify-center flex-row gap-x-3">
            <button onClick={prevMonth}>{"<"}</button>
            <div className="w-24 text-center">
             {date.toLocaleString("en-us", { month: "short", year: "numeric" })}
            </div>
            <button onClick={nextMonth}>{">"}</button>
          </div>
          <Month events={events} month={date.getMonth()} />
        </div>
      </div>
    </>
  )
}

