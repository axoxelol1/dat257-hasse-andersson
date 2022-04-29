/**
 * Wrapper class for each event endpoint.
 * Use this class to get all event data. 
 */

import { DatabaseService } from "./db.service";
import { GasqueService } from "./gasque.service";

import { Event } from "./types";

export class DataService {

    async getEvents(): Promise<Event[]> {
        const gasqueEvents : Event[] = await new GasqueService().getGasqueEvents();
        const dbEvents : Event[] = await new DatabaseService().getEvents();

        return [...gasqueEvents, ...dbEvents];
    }

}