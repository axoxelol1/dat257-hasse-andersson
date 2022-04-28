import Searchbar from "./Searchbar";
import { Timeline } from "./Timeline";
import { Event } from "../../lib/types";
import { ChangeEvent, useEffect, useState } from "react";
import Fuse from "fuse.js"

/**
 * The TimelineSearch components groups the timeline and the searchbar together
 * and adds functionality to the searchbar.
 */


export type TimelineSearchProps = {
  events: Event[];
};

export default function TimelineSearch({events}: TimelineSearchProps) {
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
    }
    const fuse = new Fuse(events, options)
    setFilteredEvents(
      fuse.search(query).map(result => result.item)
    );
  }, [query, events]);

  return (
    <div className="grow">
      <Searchbar searchHandler={searchHandler}/>
      <Timeline events={filteredEvents} />
    </div>
    );
}