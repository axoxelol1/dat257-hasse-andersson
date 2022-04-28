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

  const bigEvent = groupedEvents[0].shift();

  if (groupedEvents[0].length === 0) {
    groupedEvents.shift();
  }

  return (
    <>
      <div className="mb-6">
        <TimelineEventLarge {...bigEvent} />
      </div>
      <div className="flex flex-col gap-12">
        {groupedEvents.map((group, i) => (
          <div key={i}>
            <h1 className="text-3xl font-semibold mb-4">
              {getDateFromEvent(group[0])}
            </h1>
            <div className="flex flex-col gap-2">
              {group.map((event) => (
                <TimelineEvent key={event.id} {...event} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function TimelineEventLarge(event: Event) {
  const { title, link, host } = event;
  return (
    <div className="bg-white mb-16 py-12 px-6 rounded-lg">
      <div className="flex flex-col">
        <div className="flex flex-row place-items-center mb-3 gap-6">
          <a
            className="text-sky-700 flex flex-row place-items-center gap-2"
            target="_blank"
            href={link.toString()}
            rel="noreferrer"
          >
            <h1 className="text-4xl leading-none">{title}</h1>
            <ExternalLinkIcon />
          </a>
          <h2 className="text-2xl">{getDateFromEvent(event)}</h2>
        </div>
        <h3 className="font-semibold text-lg leading-none">{host}</h3>
      </div>
    </div>
  );
}

function TimelineEvent({ title, link, host }: Event) {
  return (
    <a href={link.toString()} target="_blank" rel="noreferrer">
      <div className="bg-white py-3 px-6 rounded-lg">
        <div className="flex place-items-center gap-2 mb-3">
          <h1 className="text-2xl text-sky-700 leading-none">{title}</h1>
          <div className="text-gray-700">
            <ExternalLinkIcon />
          </div>
        </div>
        <p className="font-semibold text-lg leading-none">{host}</p>
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
