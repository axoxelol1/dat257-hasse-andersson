/**
 * Deletes an event from the database given an event id.
 */

import { NextApiRequest, NextApiResponse } from "next";
import { DatabaseService } from "../../../lib/db.service";

export default async function deleteEvent(req: NextApiRequest, res: NextApiResponse) {
  const id = JSON.parse(req.body).id;

  const db = new DatabaseService();
  const result = await db.deleteEvent(id);

  if(result.acknowledged && result.deletedCount === 1) {
    res.status(200).send({ message: "Event deleted successfully" });
  } else {
    res.status(500).send({ error: "Failed to delete event" });
  }
}
