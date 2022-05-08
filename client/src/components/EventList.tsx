/**
 * Component which lists a list of events.
 * Consists of TimeLineEvent components.
 */

import { Event } from "../../lib/types";
import { useState } from "react";
import EditableEvent from "./EditableEvent";

export interface EventListProps {
  events: Event[];
  deleteHandler: (id: string) => void;
  editHandler: (event: Event) => void;
}

export default function EventList(props : EventListProps) {

  const [showPastEvents, setShowPastEvents] = useState(false);

  return (
      <div className="flex flex-col w-full">        
        <div>
          <input type="checkbox" className="text-sm font-bold" name="pastevents" onClick={() => setShowPastEvents(!showPastEvents)}/>
          <label> Show past events</label>
        </div>

        <div className="flex flex-col py-2 gap-y-2 ">
          {props.events
            .filter((e) => !(Date.parse(e.date) < Date.now()) || showPastEvents)
            .sort((a,b) => (Date.parse(a.date) < Date.parse(b.date)) ? 1 : -1)
            .map((event,id) => (
            <EditableEvent key={id} event={event} deleteHandler={props.deleteHandler} editHandler={props.editHandler} />
          ))}
        </div>
      </div>
  )

}