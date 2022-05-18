import Searchbar from "./Searchbar";
import { Timeline } from "./Timeline";
import { Event, Host } from "../../lib/types";
import { ChangeEvent, useEffect, useState } from "react";
import Fuse from "fuse.js";
import { ExportCalendar } from "./ExportCalendar";

/**
 * The TimelineSearch components groups the timeline and the searchbar together
 * and adds functionality to the searchbar.
 */

export type TimelineSearchProps = {
  events: Event[];
  hosts: Host[];
  selectedHosts: Host[];
};

export default function TimelineSearch({ events, hosts, selectedHosts }: TimelineSearchProps) {
  const [filteredEvents, setFilteredEvents] = useState(events);
  const [query, setQuery] = useState("");

  function searchHandler(event: ChangeEvent<HTMLInputElement>) {
    setQuery(event.target.value);
  }

  useEffect(() => {
    if (query === "") {
      setFilteredEvents(events);
      return;
    }
    const options = {
      keys: ["title", "host"],
      threshold: 0.3,
    };
    const fuse = new Fuse(events, options);
    setFilteredEvents(fuse.search(query).map((result) => result.item));
  }, [query, events]);

  return (
    <div className="grow">
      <div className="grow flex flex-row gap-4 mb-2">
        <div className="grow">
          <Searchbar searchHandler={searchHandler} />
        </div>
        <div className="hidden md:block">
          <ExportCalendar hosts={selectedHosts} />
        </div>
      </div>
      <Timeline events={filteredEvents} hosts={hosts} />
    </div>
  );
}
