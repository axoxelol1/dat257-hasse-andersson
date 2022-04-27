import { Event } from "../lib/types";
import { Logotype } from "../src/components/Logotype";
import { Page } from "../src/components/Page";
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
          date: new Date("2020-02-01").toJSON(),
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
    <Page>
      <div className="mb-16 flex flex-row place-items-center gap-8">
        <Logotype />
        <Filters />
      </div>
      <img
        src="img/chalmer.png"
        alt="Chalmers logo watermark"
        className="opacity-20 fixed bottom-10 right-12 h-96"
      />
      <div className="z-10 relative flex flex-col gap-12">
        <Timeline events={events} />
      </div>
    </Page>
  );
}
