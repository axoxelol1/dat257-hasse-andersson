/**
 *  Fetches events from gasquen's API
 * ENDPOINT: https://admin.gasquen.se/api/events
 */ 
import { Event, GasqueEvent } from "./types";

export class GasqueService {
    async getGasqueEvents() : Promise<Event[]> {
        const gasqueEvents : GasqueEvent[] = await fetch("https://admin.gasquen.se/api/events").then(res => res.json());
    
        // Convert gasqueEvents to normal events
        const convertedGasqueEvents : Event[] = [];
        gasqueEvents.forEach((ge) => {
            const convertedGasqueEvent : Event = {
                id : "gasque"+ge.id,
                title: ge.translation.title,
                host: "Gasquen",
                date: ge.date,
                link: "https://gasquen.se/",
                eventImageUrl: ge.posters.portrait_url,
                location: "Gasquen"
            }
    
            convertedGasqueEvents.push(convertedGasqueEvent);
        });
    
        return convertedGasqueEvents;
    }

    // Parses the date string in format YYYY-MM-DD to a Date object
    parseGasqueDate(ge : GasqueEvent) : Date {
        const dateString = ge.date;
        const year = parseInt(dateString.substring(0, 4));
        const month = parseInt(dateString.substring(5, 2));
        const day = parseInt(dateString.substring(8, 2));

        return new Date(year, month-1, day);
    }
}



