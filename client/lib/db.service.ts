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

  async getUser(username: string): Promise<User> {
    const client = await clientPromise;
    const result = await client
      .db(DB_NAME)
      .collection<Omit<User, "id">>(USERS_COLLECTION_NAME)
      .find({username: username})
      .toArray()
    return result[0]
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

  /**
   * Deletes an event from the database given an event id.
   * @param id id of event to delete
   * @returns result of deletion
   */
  async deleteEvent(id: string) {
    const client = await clientPromise;
    const result = await client.db(DB_NAME).collection(EVENTS_COLLECTION_NAME).deleteOne({ _id: new ObjectId(id) });
    console.log(result);
    return result;
  }
  
  /**
   * Edits an event in the database given an event.
   * @param event the event to be edited
   * @returns the result of the edit
   */
  async editEvent(event: Event) {
    const client = await clientPromise;
    const result = await client.db(DB_NAME).collection(EVENTS_COLLECTION_NAME).updateOne(
      { _id: new ObjectId(event.id) },
      { $set: event }
    );
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
