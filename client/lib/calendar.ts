import { createEvents, DateArray, EventAttributes } from "ics";
import { Event } from "./types";

/**
 * Returns an ICS calendar file from an array of events
 * @param events the events
 * @returns the ICS calendar
 */
export function createIcsCalendar(events: Event[]) {
  return createEvents(events.map(createCalendarEvent));
}

/**
 * Returns a calendar event from an event object
 * @param event the event object
 * @returns the calendar event
 */
export function createCalendarEvent({
  title,
  location,
  date,
  link,
}: Event): EventAttributes {
  return {
    start: createICSDate(new Date(date)),
    duration: { hours: 1 },
    title,
    location,
    description: link,
  };
}

/**
 * Returns a date array from a javascript date object
 * @param date the date object
 * @returns the date array
 */
function createICSDate(date: Date): DateArray {
  return [date.getFullYear(), date.getMonth() + 1, date.getDate()];
}
