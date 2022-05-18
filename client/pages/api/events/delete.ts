/**
 * Deletes an event from the database given an event id.
 */

import { NextApiRequest, NextApiResponse } from "next";
import { AuthService } from "../../../lib/auth.service";
import { DatabaseService } from "../../../lib/db.service";

export default async function deleteEvent(req: NextApiRequest, res: NextApiResponse) {
  const id = JSON.parse(req.body).id;
  const host = JSON.parse(req.body).host;

  const auth = new AuthService()
  const authedUser = await auth.verify()
  if ( !authedUser ) {
    res.status(401).send({ error: "User not logged in" });
    return;
  }

  if ( authedUser !== host || authedUser === "admin" ) {
    res.status(403).send({ error: "User can only delete events that they host themselves" });
    return;
  }

  const db = new DatabaseService();
  const result = await db.deleteEvent(id);

  if(result.acknowledged && result.deletedCount === 1) {
    res.status(200).send({ message: "Event deleted successfully" });
  } else {
    res.status(500).send({ error: "Failed to delete event" });
  }
}
