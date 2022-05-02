import { DataService } from "../lib/data.service";
import { DatabaseService } from "../lib/db.service";
import { Host, Event } from "../lib/types"

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
  return (
    <div>Hello world</div>
  )
}

