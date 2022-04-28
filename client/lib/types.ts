// Interface that defines the core attrtibutes of events that are to be displayed on the front end.
// Includes both mandatory and optional attributes, with "eventImageUrl" being optional and the other ones mandatory

import { ObjectId } from "mongodb";

export interface Event {
    _id: ObjectId;
    title: string;
    host : string;
    date : Date;
    link : string;
    eventImageUrl? : string;
    location? : string;
}

export interface GasqueEvent {
    id: string;
    date: string;
    club_ticket_price_chalmers: number;
    club_ticket_price_others: number;
    dinner_ticket_price_alcohol: number;
    dinner_ticket_price_no_alcohol: number;
    is_dinner: number;
    created_at: string;
    updated_at: string;
    facebook_event_url: string;
    club_start_time: string;
    club_end_time: string;
    dinner_start_time: string;
    is_club: number;
    priority: unknown;
    host_names: string[];
    posters: GasqueEventPosters;
}

export interface GasqueEventPosters {
    fullscreen_url: string;
    portrait_url: string;
}
