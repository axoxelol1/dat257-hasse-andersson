import { DataService } from "../lib/data.service";
import { Event } from "../lib/types";
import TimelineSearch from "../src/components/TimelineSearch";
import Filters from "../src/filter/Filters";

/**
 * This function runs in the backend and is used to fetch the events from the database.
 */
export async function getServerSideProps() {
  return {
    props: {
      events: await new DataService().getEvents(),
    },
  };
}

export default function Index({ events }: { events: Event[] }) {
  return (
    <div className="grid place-items-center">
      <div className="p-8 max-w-screen-xl w-full">
        <div className="flex flex-row place-items-center">
          <img
            src="/img/VHPC (1).png"
            alt="Website logo"
            className="w-32 h-32"
          />
          <h1 className="text-5xl -skew-x-12">Vad händer på campus?</h1>
        </div>
        <div className="flex flex-col md:flex-row w-full gap-4 mt-6">
          <Filters />
          <TimelineSearch events={events} />
        </div>
      </div>
    </div>
  );
}
