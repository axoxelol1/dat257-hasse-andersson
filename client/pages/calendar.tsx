import { DataService } from '../lib/data.service';
import { Event, Host } from '../lib/types'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import Image from 'next/image';
import Link from 'next/link';
import { DatabaseService } from '../lib/db.service';

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
      <div className='mx-2 my-2'>
        <Link href='/' passHref>
          <div className='inline-flex flex-row place-items-center cursor-pointer'>
            <div className='h-16 w-16 relative'>
              <Image 
                src="/img/VHPC (1).png" 
                alt="Site logo"
                layout="fill"
                objectFit='cover' 
              />
            </div>
            <span className='text-2xl'>Vad händer på campus?</span>
          </div>
        </Link>
      </div>
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