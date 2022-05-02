/**
 * Wrapper class for each event endpoint.
 * Use this class to get all event data. 
 */

import { DatabaseService } from "./db.service";
import { GasqueService } from "./gasque.service";

import { Event } from "./types";

export class DataService {

    /**
     * Fetches all events from all of the event sources.
     * @returns Promise<Event[]>
     */
    async getEvents(): Promise<Event[]> {
        const gasqueEvents : Event[] = await new GasqueService().getGasqueEvents();
        const dbEvents : Event[] = await new DatabaseService().getEvents();

        return [...gasqueEvents, ...dbEvents];
    }

}