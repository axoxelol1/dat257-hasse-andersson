import { DataService } from '../lib/data.service';
import { Event } from '../lib/types'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import Image from 'next/image';
import Link from 'next/link';

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
    <>
      <Link href='/' passHref>
        <div className='flex flex-row place-items-center cursor-pointer'>
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
    </>
  );
}