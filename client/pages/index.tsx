import { DataService } from "../lib/data.service";
import { Event, Host } from "../lib/types";
import TimelineSearch from "../src/components/TimelineSearch";
import Filters from "../src/components/Filters";
import { useState } from "react";
import { DatabaseService } from "../lib/db.service";
import '@fullcalendar/common/main.css'; // @fullcalendar/react imports @fullcalendar/common
import '@fullcalendar/daygrid/main.css'; // @fullcalendar/timegrid imports @fullcalendar/daygrid
import Navbar from "../src/components/Header";
import SlideShow from "../src/components/SlideShow";


/**
 * This function runs in the backend and is used to fetch the events from the data sources.
 */
export async function getServerSideProps() {
  return {
    props: {
      events: await new DataService().getEvents(),
      hosts: await new DatabaseService().getHosts(),
    },
  };
}

export default function Index({ events, hosts }: { events: Event[], hosts: Host[] }) {

  const [displayedEvents, setDisplayedEvents] = useState([...events])

  return (
    <>
      <div className="fixed h-screen w-screen scale-110 -z-20 opacity-50">
        <SlideShow />
      </div>

      <div>
        <Navbar />
        <div className="flex flex-col items-center m-8">
          <div className="max-w-screen-xl w-full">
            <div className="flex flex-col md:flex-row w-full gap-4 h-fit">
              <Filters
                eventSetter={setDisplayedEvents}
                events={events}
                hosts={hosts}
              />
              <TimelineSearch events={displayedEvents} hosts={hosts} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
