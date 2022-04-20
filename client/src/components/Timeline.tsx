import { Event } from "../../lib/types";

export type TimelineProps = {
  events: Event[];
};

export function Timeline({ events }: TimelineProps) {
  return (
    <div>
      {events.map((event) => (
        <TimelineEvent key={event.id} {...event} />
      ))}
    </div>
  );
}

function TimelineEvent({ title, link }: Event) {
  return (
    <div>
      <h1>{title}</h1>
      <a href={link.toString()}>link</a>
    </div>
  );
}
