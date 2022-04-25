import { Event } from "../lib/types";
import { Timeline } from "../src/components/Timeline";
import Filters from "../src/filter/Filters";

/**
 * This function runs in the backend and can be used to fetch the events from the database in the future.
 * For now we are using mocked data for testing.
 */
export function getServerSideProps() {
  return {
    props: {
      events: [
        {
          id: "2",
          title: "PU-Movie: The Kingen 2",
          link: "https://www.facebook.com/events/340855818101825/?ref=newsfeed",
          date: new Date("2020-06-02").toJSON(),
          host: "PU 2",
        },
        {
          id: "1",
          title: "Plupp movie",
          link: "https://www.facebook.com/events/340855818101825/?ref=newsfeed",
          date: new Date("2020-06-01").toJSON(),
          host: "Plupp Inc",
        },
        {
          id: "1",
          title: "PU-Movie: The Kingen",
          link: "https://www.facebook.com/events/340855818101825/?ref=newsfeed",
          date: new Date("2020-06-01").toJSON(),
          host: "PU",
        },
        {
          id: "1",
          title: "jämK-Movie: The Queenen",
          link: "https://www.facebook.com/events/340855818101825/?ref=newsfeed",
          date: new Date("2020-07-12").toJSON(),
          host: "jämK",
        },
      ],
    },
  };
}

export default function Index({ events }: { events: Event[] }) {
  return (
    <div className="grid place-items-center">
      <div className="p-8 max-w-screen-xl w-full">
        <div className="flex flex-row place-items-center">
          <img src="/img/VHPC (1).png" alt="Website logo" className="w-32 h-32" />
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
