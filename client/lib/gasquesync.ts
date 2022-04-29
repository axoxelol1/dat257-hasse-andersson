// Fetches events from gasquen's API and syncs it with our database
// ENDPOINT: https://admin.gasquen.se/api/events
import { DatabaseService } from "./db.service";
import { Event, GasqueEvent } from "./types";

export default async function syncGasque() : Promise<void> {

    const gasqueEvents : GasqueEvent[] = await fetch("https://admin.gasquen.se/api/events").then(res => res.json());
    const dbEvents : Event[] = await new DatabaseService().getEvents();

    // Convert gasqueEvents to normal events
    const convertedGasqueEvents : Event[] = [];
    gasqueEvents.forEach((ge) => {
        const convertedGasqueEvent : Event = {
            id : "gasque"+ge.id,
            title: ge.translation.title,
            host: "Gasquen",
            date: parseGasqueDate(ge),
            link: "https://gasquen.se/",
            eventImageUrl: ge.posters.portrait_url,
            location: "Gasquen"
        }

        convertedGasqueEvents.push(convertedGasqueEvent);
    })

    // Partition events into those who already exist in the DB and those who do not
    const existingEvents : Event[] = convertedGasqueEvents.filter((ge : Event) => {
        dbEvents.some((e : Event) => {e.id == ge.id});
    });
    
    const nonexistingEvents : Event[] = dbEvents.filter((e : Event) => !existingEvents.includes(e));

    console.log(existingEvents);
    console.log(nonexistingEvents);
}

// Parses the date string in format YYYY-MM-DD to a Date object
function parseGasqueDate(ge : GasqueEvent) : Date {
    const dateString = ge.date;
    const year = parseInt(dateString.substring(0, 4));
    const month = parseInt(dateString.substring(5, 2));
    const day = parseInt(dateString.substring(8, 2));

    return new Date(year, month-1, day);
}