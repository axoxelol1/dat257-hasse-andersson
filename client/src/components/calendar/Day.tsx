import { Event } from "../../../lib/types";

export type DayProps = {
  events: Event[];
};

export function Day({ events }: DayProps) {
  return (
    <div className="border-black border-2 w-20 h-20">
      {events.map((event) => (
        <div key={event.id}>{event.title}</div>
      ))}
    </div>
  );
}