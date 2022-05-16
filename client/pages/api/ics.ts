import { NextApiRequest, NextApiResponse } from "next";
import { NextApiRequestQuery } from "next/dist/server/api-utils";
import { createIcsCalendar } from "../../lib/calendar";
import { DataService } from "../../lib/data.service";
import { DatabaseService } from "../../lib/db.service";
import { Event } from "../../lib/types";

type FilterDates = [begin: Date, end: Date];


/**
 * Returns an iCalendar file with the events in the database. Accepts queries "hosts", "begin", "end" for filtering the events.
 */
export default async function ics(
  { query }: NextApiRequest,
  res: NextApiResponse
) {
  const hosts = await mapLongNamesToShortNames(getHostsFromQuery(query));
  const dates = getDatesFromQuery(query);

  const events = filterByDates(
    dates,
    filterByHosts(hosts, await new DataService().getEvents())
  );

  const { error, value } = createIcsCalendar(events);

  if (error) {
    res.status(500).send(error);
  }

  sendCalendar(res, value);
}

function filterByDates([begin, end]: FilterDates, events: Event[]) {
  return events.filter(
    (event) =>
      (!begin || new Date(event.date) >= begin) &&
      (!end || new Date(event.date) <= end)
  );
}

function getDatesFromQuery({ begin, end }: NextApiRequestQuery): FilterDates {
  return [isDate(begin) && new Date(begin), isDate(end) && new Date(end)];
}

function isDate(date: unknown): date is Date {
  if (date === undefined || date === null) {
    return false;
  }
  if (typeof date === "object" && !isNaN((date as Date)?.getDate())) {
    return true;
  }
  if (
    (typeof date === "string" || typeof date === "number") &&
    !isNaN(new Date(date).getDate())
  ) {
    return true;
  }
  return false;
}

function sendCalendar(res: NextApiResponse, calendar: string) {
  res.setHeader("Content-Type", "text/calendar").status(200).send(calendar);
}

function getHostsFromQuery({ hosts }: NextApiRequestQuery) {
  if (!hosts || Array.isArray(hosts)) {
    return [];
  }

  return hosts.split(",");
}

async function mapLongNamesToShortNames(longNames: string[]) {
  const hostsMap = new Map(
    (await new DatabaseService().getHosts()).map(({ longName, shortName }) => [
      shortName,
      longName,
    ])
  );
  return longNames.map((longName) => hostsMap.get(longName));
}

function filterByHosts(hosts: string[] = [], events: Event[]) {
  if (hosts.length === 0) {
    return events;
  }

  return events.filter(({ host }) => hosts.includes(host));
}
