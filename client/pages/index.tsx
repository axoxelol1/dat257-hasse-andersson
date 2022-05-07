import { DataService } from "../lib/data.service";
import { Event, Host, User } from "../lib/types";
import TimelineSearch from "../src/components/TimelineSearch";
import Filters from "../src/components/Filters";
import { useState } from "react";
import { DatabaseService } from "../lib/db.service";
import Loginwindow from "../src/components/Loginwindow";
import { Page } from "../src/components/Page";
import { Logotype } from "../src/components/Logotype";
import '@fullcalendar/common/main.css'; // @fullcalendar/react imports @fullcalendar/common
import '@fullcalendar/daygrid/main.css'; // @fullcalendar/timegrid imports @fullcalendar/daygrid

/**
 * This function runs in the backend and is used to fetch the events from the data sources.
 */
export async function getServerSideProps() {
  return {
    props: {
      events: await new DataService().getEvents(),
      hosts: await new DatabaseService().getHosts(),
      users: await new DatabaseService().getUsers() //I really don't think we should be retrieving all users... it seems wrong
    },
  };
}

export default function Index({ events, hosts, users }: { events: Event[], hosts: Host[], users: User[] }) {

  const [displayedEvents, setDisplayedEvents] = useState([...events])

  return (
    <Page>
      <div className="max-w-screen-xl w-full">
        <Logotype />
        <div className="flex flex-col md:flex-row w-full gap-4 mt-6">
          <Filters
            eventSetter={setDisplayedEvents}
            events={events}
            hosts={hosts}
          />
          <TimelineSearch events={displayedEvents} />
          <div>
            <Loginwindow users={users}/>
          </div>
        </div>
      </div>
    </Page>
  );
}
