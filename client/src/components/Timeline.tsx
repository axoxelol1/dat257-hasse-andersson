import Image from "next/image";
import { Event } from "../../lib/types";

export type TimelineProps = {
  events: Event[];
};

export function Timeline({ events }: TimelineProps) {
  const groupedEvents = groupEvents(
    events.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    )
  );

  return (
    <div className="flex flex-col gap-8">
      <TimelineEventLarge {...groupedEvents[0][0]} />
      {groupedEvents.map((group, i) => (
        <div key={i}>
          <h1 className="text-2xl font-semibold mb-2">
            {getDateFromEvent(group[0])}
          </h1>
          <div className="flex flex-col gap-2">
            {group.map((event, i) => (
              <TimelineEvent key={event._id?.toString() ?? i} {...event} />
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

function TimelineEventLarge(event: Event) {
  const { title, link, host } = event;
  return (
    <div className="flex flex-col md:flex-row justify-between">
      <div className="flex flex-col">
        <h1 className="text-2xl font-semibold">Nästa evenemang</h1>
        <div className="py-12 rounded-lg flex flex-row place-items-center gap-6">
          <CalendarIcon date={new Date(event.date)} />
          <div className="flex flex-col">
            <div className="flex flex-row place-items-center mb-3 gap-6">
              <a
                className="flex flex-row place-items-center gap-2 text-blue-700"
                target="_blank"
                href={link.toString()}
                rel="noreferrer"
              >
                <h1 className="text-4xl leading-none">{title}</h1>
              </a>
            </div>
            <span className="text-base leading-none">{host}</span>
          </div>
        </div>
      </div>
      <a
        className="flex flex-row place-items-center gap-2 text-blue-700"
        target="_blank"
        href={link.toString()}
        rel="noreferrer"
      >
        <div className="relative h-72 aspect-[3/2]">
          <Image
            layout="fill"
            alt="Image for the event."
            src="https://thiscatdoesnotexist.com/"
          />
        </div>
      </a>
    </div>
  );
}

function TimelineEvent({ title, link, host }: Event) {
  return (
    <a href={link.toString()} target="_blank" rel="noreferrer">
      <div className="bg-white py-3 px-6 rounded-lg flex flex-row justify-between place-items-center">
        <div>
          <div className="mb-3">
            <h1 className="text-2xl leading-none">{title}</h1>
          </div>
          <p className="text-base leading-none">{host}</p>
        </div>
        <ExternalLinkIcon />
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
