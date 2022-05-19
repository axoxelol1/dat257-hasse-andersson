import { Icon } from "@iconify/react";
import { Host } from "../../lib/types";

export type CalendarQueries = {
  hosts?: Host[];
  begin?: Date;
  end?: Date;
};

export type ExportCalendarProps = Pick<CalendarQueries, "hosts">;

export function ExportCalendar({ hosts }: ExportCalendarProps) {
  const url = createCalendarUrl({ hosts });

  return (
    <div className="relative flex flex-row h-full bg-white px-4 rounded-md place-items-center justify-between">
      <span className="h-full flex place-items-center w-max font-semibold">
        Export calendar
      </span>
      <div className="flex flex-row place-items-center">
        <button
          className="relative group overflow-visible grid place-items-center"
          onClick={() => copyToClipboard(url)}
        >
          <Icon icon="octicon:copy-16" className="cursor-pointer hover:bg-slate-200 p-1.5 box-border rounded" fontSize={28} />
          <span className="absolute -top-8 right-1/2 translate-x-1/2 bg-green-400 hidden group-focus-within:grid font-bold p-2 place-items-center w-max rounded">
            Link copied!
          </span>
        </button>
        <button onClick={() => downloadFile(url)}>
          <Icon
            icon="octicon:download-16"
            className="cursor-pointer hover:bg-slate-200 p-1.5 box-border rounded"
            fontSize={30}
          />
        </button>
      </div>
    </div>
  );
}

function downloadFile(url: string) {
  const link = document.createElement("a");
  link.href = url;
  link.download = "calendar.ics";
  link.click();
}

function copyToClipboard(value: string) {
  // copy to clipboard using navigator
  navigator.clipboard.writeText(value);
}

/**
 * Returns a URl by which to download the calendar.
 * @param options
 */
export function createCalendarUrl(
  { begin, end, hosts }: CalendarQueries,
  origin = typeof window !== "undefined"
    ? window.origin
    : "http://localhost:3000"
) {
  const url = new URL(origin + "/api/ics");
  begin && url.searchParams.set("begin", begin.toISOString());
  end && url.searchParams.set("end", end.toISOString());
  hosts &&
    url.searchParams.set(
      "hosts",
      hosts.map(({ shortName }) => shortName).join(",")
    );
  return url.toString();
}
