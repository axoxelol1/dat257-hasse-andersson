import clientPromise from "../lib/mongodb";
import { Event } from "../lib/types";
import { Timeline } from "../src/components/Timeline";
import Filters from "../src/filter/Filters";

/**
 * This function runs in the backend and can be used to fetch the events from the database in the future.
 * For now we are using mocked data for testing.
 */
export async function getServerSideProps() {
  const client = await clientPromise;
  const result = await client
    .db("campusapp")
    .collection<Event>("events")
    .find({})
    .toArray();

  // We need to convert the mongodb ObjectId to a plain javascript object
  // because NextJS cannot serialize it
  const events: Event[] = result.map((event) =>
    JSON.parse(JSON.stringify(event))
  );

  return {
    props: {
      events,
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
          <div className="grow">
            <Timeline events={events} />
          </div>
        </div>
      </div>
    </div>
  );
}
