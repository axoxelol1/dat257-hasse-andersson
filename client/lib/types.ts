// Interface that defines the core attrtibutes of events that are to be displayed on the front end.
// Includes both mandatory and optional attributes, with "eventImageUrl" being optional and the other ones mandatory

export interface Event {
    id: string;
    title: string;
    host : string;
    date : Date;
    link : URL;
    eventImageUrl? : string;
    location? : string;
}
