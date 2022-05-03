/**
 * Given an event, inserts an event into the database.
 */

import { NextApiRequest, NextApiResponse } from "next";
import { DatabaseService } from "../../../lib/db.service";
import { Event } from "../../../lib/types";

export default async function add(req: NextApiRequest, res: NextApiResponse) {
  const event: Event = JSON.parse(req.body);

  if (!inputIsValid(event)) {
    res.status(400).json({ error: "Missing required fields. Required fields are: title, host, date and time" });
    return;
  }

  const db = new DatabaseService();
  db.addEvent(event).then(result => {
    res.status(200).send(JSON.stringify(result));
  }).catch(err => {
    res.status(500).send(err);
  })
}

function inputIsValid(event: Event): boolean {
  return event.title == "" || event.date == "" || event.host == "";
}