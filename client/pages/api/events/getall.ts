/**
 * Gets all events from the database only!
 * Used by dashboard to fetch all editable events.
 */

import { NextApiRequest, NextApiResponse } from "next";
import { AuthService } from "../../../lib/auth.service";
import { DatabaseService } from "../../../lib/db.service";

export default async function getall(req: NextApiRequest, res: NextApiResponse) {

  const auth = new AuthService()
  const authedUser = await auth.verify()
  console.log(authedUser)
  
  if ( !authedUser ) {
    res.status(401).send({ error: "Could not get events because user is not logged in" });
    return;
  }

  const db = new DatabaseService();
  db.getEvents().then(result => {
    const filteredResult = result.filter( event => event.host === authedUser)
    console.log(authedUser)
    console.log(filteredResult)
    res.status(200).json(filteredResult);
  }).catch(err => {
    res.status(500).json(err);
  })
}