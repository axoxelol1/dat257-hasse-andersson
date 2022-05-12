import { DataService } from '../lib/data.service';
import { Event, Host } from '../lib/types'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { DatabaseService } from '../lib/db.service';
import Header from '../src/components/Header';

/**
 * This function runs in the backend and is used to fetch the events from the data sources.
 */
 export async function getServerSideProps() {
  return {
    props: {
      events: await new DataService().getEvents(),
      hosts: await new DatabaseService().getHosts()
    },
  };
}

export default function Calendar({ events, hosts }: { events: Event[], hosts: Host[] }) {
  const calendarEvents = events.map(event => {
    const color = hosts.find(host => host.longName === event.host)?.color;
    return {
      ...event,
      url: event.link,
      borderColor: color
    }
  });
    
  return (
    <>
      <Header/>
      <div className='mx-6'>
        <FullCalendar
          plugins={[ dayGridPlugin ]}
          initialView='dayGridMonth'
          events={calendarEvents}
          height={"auto"}
          contentHeight={"auto"}
          eventTimeFormat={{
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
          }}
          weekNumberCalculation={"ISO"}
          weekNumbers={true}
          weekNumberFormat={{week: 'numeric'}}
          titleFormat={{year: 'numeric', month: 'short'}}
        />
      </div>
    </>
  );
}