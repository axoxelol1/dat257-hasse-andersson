export interface Event {
    id : number;
    title : string;
    host : Host;
    date : Date;
    link : URL;
    location? : string;
    eventImageUrl? : string;
}

export interface Host {
    name : string;
    imageUrl : string;
}
