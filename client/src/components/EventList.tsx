/**
 * Component which lists a list of events.
 * Consists of TimeLineEvent components.
 */

import { Event } from "../../lib/types";
import { TimelineEvent } from "./Timeline";
import { useState } from "react";

export interface EventListProps {
  events: Event[];
}

export default function EventList(props : EventListProps) {

  const [showPastEvents, setShowPastEvents] = useState(false);

  return (
    <>
      <div className="flex flex-col w-full">
        <span className="text-xl w-full border-b-2 border-black font-bold">Events</span>
        
        <div>
          <input type="checkbox" className="text-sm font-bold" name="pastevents" onClick={() => setShowPastEvents(!showPastEvents)}/>
          <label> Show past events</label>
        </div>

        <div className="flex flex-col py-2 gap-y-2 ">
          {props.events
            .filter((e) => !(Date.parse(e.date) < Date.now()) || showPastEvents)
            .sort((a,b) => (Date.parse(a.date) < Date.parse(b.date)) ? 1 : -1)
            .map((event,id) => (
            <TimelineEvent key={id} {...event} />
          ))}
        </div>
        
      </div>
    </>
  )

}