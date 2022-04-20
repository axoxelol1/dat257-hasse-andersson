import { Event } from "../lib/types";
import { Timeline } from "../src/components/Timeline";

const event1: Event = {
  id: "1",
  title: "PU-Movie: The Kingen",
  link: new URL(
    "https://www.facebook.com/events/340855818101825/?ref=newsfeed"
  ),
  date: new Date("2020-06-01"),
  host: "PU",
};

const event2: Event = {
  id: "2",
  title: "PU-Movie: The Kingen 2",
  link: new URL(
    "https://www.facebook.com/events/340855818101825/?ref=newsfeed"
  ),
  date: new Date("2020-06-02"),
  host: "PU 2",
};

export default function TimelinePage() {
  return (
    <div>
      <Timeline events={[event1, event2]} />
    </div>
  );
}
