import { DataService } from '../lib/data.service';
import { Event } from '../lib/types'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

/**
 * This function runs in the backend and is used to fetch the events from the data sources.
 */
 export async function getServerSideProps() {
  return {
    props: {
      events: await new DataService().getEvents()
    },
  };
}

export default function Calendar({ events }: { events: Event[] }) {
  const calendarEvents = events.map(event => {
    return {
      ...event,
      url: event.link
    }
  });
    
  return (
    <FullCalendar
      plugins={[ dayGridPlugin ]}
      initialView="dayGridMonth"
      events={calendarEvents}
      eventTimeFormat={{
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }}
    />
  );
}