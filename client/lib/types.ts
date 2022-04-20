export interface Event {
    id: string;
    title: string;
    host : string;
    date : Date;
    link : URL;
    eventImageUrl? : string;
    location? : string;
}
