import { ObjectId } from "mongodb";
import clientPromise from "./mongodb";
import { Event } from "./types";

const DB_NAME = "campusapp";
const EVENTS_COLLECTION_NAME = "events";

/**
 * This class provides an interface to the events collection in the database.
 */
export class DatabaseService {
  async getEvents(): Promise<Event[]> {
    const client = await clientPromise;
    const result = await client
      .db(DB_NAME)
      .collection<Omit<Event, "id">>(EVENTS_COLLECTION_NAME)
      .find()
      .toArray();

    return result.map(this.serializeId);
  }

  // We need to convert the mongodb ObjectId to a plain javascript object
  // because NextJS cannot serialize it
  private serializeId<T>(obj: T & { _id: ObjectId }): T & { id: string } {
    const result = {
      ...obj,
      id: obj._id.toHexString(),
    };

    delete result._id;
    return result;
  }
}
