import { Event } from "../lib/types";
import { Timeline } from "../src/components/Timeline";

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
        <h1 className="text-5xl -skew-x-12 mt-6 mb-16 ">Vad händer på campus?</h1>
        <Timeline events={events} />
      </div>
    </div>
  );
}
