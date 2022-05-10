import { DataService } from "../lib/data.service";
import { Event, Host } from "../lib/types";
import TimelineSearch from "../src/components/TimelineSearch";
import Filters from "../src/components/Filters";
import { useState } from "react";
import { DatabaseService } from "../lib/db.service";
import { Page } from "../src/components/Page";
import '@fullcalendar/common/main.css'; // @fullcalendar/react imports @fullcalendar/common
import '@fullcalendar/daygrid/main.css'; // @fullcalendar/timegrid imports @fullcalendar/daygrid
import Navbar from "../src/components/Navbar";

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

export default function Index({
  events,
  hosts,
}: {
  events: Event[];
  hosts: Host[];
}) {
  const [displayedEvents, setDisplayedEvents] = useState([...events]);

  return (
    <div>
      <Navbar/>
      <Page>
        <div className="max-w-screen-xl w-full">
          <div className="flex flex-col md:flex-row w-full gap-4 mt-6">
            <Filters
              eventSetter={setDisplayedEvents}
              events={events}
              hosts={hosts}
            />
            <TimelineSearch events={displayedEvents} />
          </div>
        </div>
      </Page>
    </div>
  );
}
