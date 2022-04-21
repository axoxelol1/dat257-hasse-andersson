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
