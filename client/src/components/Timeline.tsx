/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { Event, Host } from "../../lib/types";

export type TimelineProps = {
  events: Event[];
  hosts: Host[];
};

export function Timeline({ events, hosts }: TimelineProps) {
  events = events.filter(event => new Date(event.date).getTime() > Date.now());

  if (events.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full w-full">
        <h1 className="text-4xl text-center">
          No events found.
        </h1>
      </div>
    );
  }

  const groupedEvents = groupEvents(
    events.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    )
  );

  const bigEvent = groupedEvents[0].shift();

  if (groupedEvents[0].length === 0) {
    groupedEvents.shift();
  }

  return (
    <div className="flex flex-col gap-8">
      <TimelineEventLarge {...bigEvent} />
      {groupedEvents.map((group, i) => (
        <div key={i}>
          <h1 className="text-2xl font-semibold mb-2">
            {getDateFromEvent(group[0])}
          </h1>
          <div className="flex flex-col gap-2">
            {group.map((event) => (
              <TimelineEvent key={event.id} event={event} host={hosts.find((h) => h.longName == event.host)} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function CalendarIcon({ date }: { date: Date }) {
  return (
    <div className="shadow-md w-24 h-24 rounded-lg overflow-clip bg-white">
      <div className="w-full bg-red-600 flex justify-center text-lg">
        <span className="text-white font-semibold">
          {date.toLocaleString("sv", { month: "long" })}
        </span>
      </div>
      <div className="w-full mt-3 grid place-items-center">
        <span className="text-2xl font-semibold">{date.getDate()}</span>
      </div>
    </div>
  );
}

function TimelineEventLarge(event : Event) {
  
  function getTimeIfExists() {
    const date = new Date(event.date);
    if (date.getHours() === 0 && date.getMinutes() === 0) {
      return "";
    } else {
      return date.toLocaleString("sv", {
        hour: "numeric",
        minute: "numeric",
      });
    }
  }
  
  return (
    <div className="flex flex-col md:flex-row justify-between">
      <div className="flex flex-col">
        <h1 className="text-2xl font-semibold">Nästa arrangemang</h1>
        <div className="py-16 rounded-lg flex flex-row place-items-center gap-6 justify-center md:justify-start">
          <CalendarIcon date={new Date(event.date)} />
          <div className="flex flex-col basis-0 grow">
            <div className="flex flex-row place-items-center mb-3 gap-6">
              <a
                className="flex flex-row place-items-center gap-2 font-bold"
                target="_blank"
                href={event.link.toString()}
                rel="noreferrer"
              >
                <h1 className="text-4xl leading-none break-all">{event.title}</h1>
              </a>
            </div>
            <span>{event.host}</span>
            <span>{event.location ? (event.location + " 📌") : ""}</span>
            <span>{getTimeIfExists()}</span>
          </div>
        </div>
      </div>
      <a
        className="flex flex-row place-items-center justify-center gap-2"
        target="_blank"
        href={event.link.toString()}
        rel="noreferrer"
      >
        {event.eventImageUrl && (
          <div className="relative max-w-[60%] md:invisible lg:visible">
            <img
              alt="Image for the event."
              src={event.eventImageUrl ? event.eventImageUrl : "/img/chalmers.png"}
            />
          </div>
        )}
      </a>
    </div>
  );
}

interface TimelineEventProps {
  event: Event;
  host: Host;
}

export function TimelineEvent({ event, host }: TimelineEventProps) {

  const style = {
    'borderColor': host.color ? host.color : '#080808',
  }

  return (
    <a href={event.link.toString()} target="_blank" rel="noreferrer">
      <div style={style} className="bg-white py-3 px-6 rounded-lg flex flex-col sm:flex-row gap-y-2 justify-between place-items-center border-l-4">
        <div className="flex flex-col place-items-center gap-y-2 sm:place-items-start">
          <div className="sm:mb-3 text-center sm:text-left">
            <h1 className="text-2xl leading-none">{event.title}</h1>
          </div>
          <div className="flex flex-row place-items-center sm:justify-start justify-center">
            <Image 
              src={"/img/CommittePics/"+host.shortName.toLowerCase()+".png"}
              width={32}
              height={32}
              className="rounded-full"
              alt="Host logo"
            />
            <p className="text-base leading-none ml-2">{host.longName}</p>
          </div>
        </div>
        <div className="flex flex-col grow place-items-center sm:place-items-end px-2 gap-y-2">
          <span className="">{event.location ? (event.location + " 📌") : ""}</span>
          <span>{event.date}</span>
        </div>
        <div className="shrink-0">
          <ExternalLinkIcon />
        </div>
      </div>
    </a>
  );
}

function groupEvents(dates: Event[]) {
  const groupedDates = [[dates[0]]];

  for (let i = 0; i < dates.length; i++) {
    const current = dates[i];
    const next = dates[i + 1];

    if (!next) {
      break;
    }

    if (
      new Date(current.date).getUTCDate() === new Date(next.date).getUTCDate()
    ) {
      groupedDates[groupedDates.length - 1].push(next);
    } else {
      groupedDates.push([next]);
    }
  }

  return groupedDates;
}

function getDateFromEvent(event: Event): string {
  const date = new Date(event.date);
  const month = date.toLocaleString("sv", { month: "long" });
  const day = date.getDate();
  return `${day} ${capitalize(month)}`;
}

/**
 * Capitalize the first letter of a string.
 *
 * @returns the string
 */
function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function ExternalLinkIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
      />
    </svg>
  );
}
