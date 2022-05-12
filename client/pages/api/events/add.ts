/**
 * Given an event in body of request, inserts it event into the database
 * given that all required fields are there.
 */

import { NextApiRequest, NextApiResponse } from "next";
import { AuthService } from "../../../lib/auth.service";
import { DatabaseService } from "../../../lib/db.service";
import { Event } from "../../../lib/types";

export default async function add(req: NextApiRequest, res: NextApiResponse) {
  const event: Event = JSON.parse(req.body);

  if (!inputIsValid(event)) {
    res.status(400).send({ error: "Missing required fields. Required fields are: title, host and date" });
    return;
  }

  const auth = new AuthService()
  const authedUser = await auth.verify()
  if ( !authedUser ) {
    res.status(401).send({ error: "User not logged in" });
    return;
  }

  if ( authedUser !== event.host ) {
    res.status(403).send({ error: "User can only add events that they host themselves" });
    return;
  }

  const db = new DatabaseService();
  const result = await db.addEvent(event);
  if (result.acknowledged) {
    res.status(200).send({ message: "Event added successfully" });
  } else {
    res.status(500).send({ error: "Failed to add event" });
  }
}

function inputIsValid(event: Event): boolean {
  return event.title !== "" && event.date !== "" && event.host !== "" && event.link !== "";
}