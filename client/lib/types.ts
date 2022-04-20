export interface Event {
    id: string;
    title: string;
    host : Host;
    date : Date;
    link : URL;
    eventImageUrl? : string;
    location? : string;
}

export interface Host {
    name : string;
    imageUrl : string;
}