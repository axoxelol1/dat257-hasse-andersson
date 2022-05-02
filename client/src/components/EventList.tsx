/**
 * Component which lists a list of events.
 * Consists of TimeLineEvent components.
 */

import { Event } from "../../lib/types";
import { TimelineEvent } from "./Timeline";

export interface EventListProps {
  events: Event[];
}

export default function EventList(props : EventListProps) {

  return (
    <>
      <div className="flex flex-col w-full">
        <span className="text-xl font-bold">Events</span>
        <div className="flex flex-col py-2 gap-y-2 border-t-2 border-black">
          {props.events.sort((a,b) => (Date.parse(a.date) > Date.parse(b.date)) ? 1 : 0).map((event,id) => (
            <TimelineEvent key={id} {...event} />
          ))}
        </div>
      </div>
    </>
  )

}