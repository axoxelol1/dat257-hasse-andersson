import { ObjectId } from "mongodb";
import clientPromise from "./mongodb";
import { Event, Host, User } from "./types";

const DB_NAME = "campusapp";
const EVENTS_COLLECTION_NAME = "events";
const HOSTS_COLLECTION_NAME = "committees";
const USERS_COLLECTION_NAME = "users";

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

  async getHosts(): Promise<Host[]> {
    const client = await clientPromise;
    const result = await client
      .db(DB_NAME)
      .collection<Omit<Host, "id">>(HOSTS_COLLECTION_NAME)
      .find()
      .toArray();

    return result.map(this.serializeId);
  }

  async getUsers(): Promise<User[]> {
    const client = await clientPromise;
    const result = await client
      .db(DB_NAME)
      .collection<Omit<User, "id">>(USERS_COLLECTION_NAME)
      .find()
      .toArray();

    return result.map(this.serializeId);
  }

  async addUser(user: User) {
    const client = await clientPromise;
    const result = await client.db(DB_NAME).collection(USERS_COLLECTION_NAME).insertOne(user);
    return result;
  }
  /**
   * Function needs object of type event, where ID is required, but the form does not include it
   * Therefore send a dummy id to this function and it will be deleted and automatically added
   * by mongodb.
   */
  async addEvent(event: Event) {
    delete event.id;
    const client = await clientPromise;
    const result = await client.db(DB_NAME).collection(EVENTS_COLLECTION_NAME).insertOne(event);
    return result;
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
