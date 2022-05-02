import { Event } from "../../../lib/types";
import { Day } from "./Day";

export type MonthProps = {
  events: Event[],
  month: number,
};

export function Month({ events, month }: MonthProps) {
  return (
    <div className="grid grid-cols-7 grid-rows-6 gap-1">
      {getDaysInMonth(month, new Date().getFullYear()).map((day) => (
        <Day key={day.toDateString()} events={events.filter((event) => isSameDay(new Date(event.date), day))} />
      ))}
    </div>
  );
}

function isSameDay(d1: Date, d2: Date): boolean {
  return d1.getFullYear() === d2.getFullYear() && 
  d1.getMonth() === d2.getMonth() && 
  d1.getDate() === d2.getDate();
}

function getDaysInMonth(month: number, year: number): Date[] {
  const date = new Date(year, month, 1);
  const days = [];
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
}