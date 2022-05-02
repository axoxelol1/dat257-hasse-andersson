/**
 * Gets all events from the database only!
 * Used by dashboard to fetch all editable events.
 */

import { NextApiRequest, NextApiResponse } from "next";
import { DatabaseService } from "../../../lib/db.service";

export default function getall(req: NextApiRequest, res: NextApiResponse) {
  const db = new DatabaseService();
  db.getEvents().then(result => {
    res.status(200).json(result);
  }).catch(err => {
    res.status(500).json(err);
  })
}