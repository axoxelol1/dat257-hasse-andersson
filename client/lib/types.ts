// Interface that defines the core attrtibutes of events that are to be displayed on the front end.
// Includes both mandatory and optional attributes, with "eventImageUrl" being optional and the other ones mandatory

export interface Event {
  id: string;
  title: string;
  host: string;
  date: string;
  link: string;
  eventImageUrl?: string;
  location?: string;
}

export interface Host {
  shortName: string;
  longName: string;
}

export interface User {
  username: string;
  salthash: string;
}

/**
 * Extra interfaces used to convert gasque events to regular events whose type is defined above
 */
export interface GasqueEvent {
    id: number;
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
    translation: GasqueEventTranslation
}

export interface GasqueEventPosters {
    fullscreen_url: string;
    portrait_url: string;
}

export interface GasqueEventTranslation {
    id: number;
    event_id: number;
    locale: string;
    title: string;
    poster_url: string;
    theme: string;
    dress_code: unknown;
    event_description: string;
    dinner_ticket_description: string;
    created_at: string;
    updated_at: string,
    fullscreen_poster_url: string;
    date: string;
    type: string;
}
