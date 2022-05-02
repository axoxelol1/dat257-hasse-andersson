/**
 * Given an event, inserts an event into the database.
 */

import { NextApiRequest, NextApiResponse } from "next";
import { DatabaseService } from "../../../lib/db.service";
import { Event } from "../../../lib/types";

export default async function add(req: NextApiRequest, res: NextApiResponse) {
  const event: Event = JSON.parse(req.body);
  const db = new DatabaseService();
  db.addEvent(event).then(result => {
    res.status(200).json(result);
  }).catch(err => {
    res.status(500).json(err);
  })
}