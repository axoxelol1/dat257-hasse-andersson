import Searchbar from "./Searchbar";
import { Timeline } from "./Timeline";
import { Event } from "../../lib/types";
import { ChangeEvent, useEffect, useState } from "react";

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
    setFilteredEvents(
      events.filter((event) =>
        event.title.toLowerCase().includes(query.toLowerCase()) || 
        event.host.toLowerCase().includes(query.toLowerCase())
      )
    );
  }, [query, events]);

  return (
    <>
      <div className="grow">
        <Searchbar searchHandler={searchHandler}/>
        <Timeline events={filteredEvents} />
      </div>
    </>
    );
}