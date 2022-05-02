import Image from "next/image";
import EventForm from "../src/components/EventForm";
import EventList from "../src/components/EventList";
import { Event } from "../lib/types";
import { DatabaseService } from "../lib/db.service";


export async function getServerSideProps() {
  return {
    props: {
      events: await new DatabaseService().getEvents(),
    },
  };
}

export default function Dashboard ({ events } : {events : Event[]}) {

  return (
    <div className="grid place-items-center">
      <div className="p-8 max-w-screen-xl w-full">
        <div className="flex flex-row place-items-center">
          <Image
            src="/img/VHPC (1).png"
            alt="Website logo"
            width={"96"}
            height={"96"}
          />
          <h1 className="text-5xl -skew-x-12">VHPC - Dashboard</h1>
        </div>
        <div className="flex flex-col md:flex-row w-full gap-4 mt-6">
          <EventForm />
          <EventList events={events}/>
        </div>
      </div>
    </div>
  )
}