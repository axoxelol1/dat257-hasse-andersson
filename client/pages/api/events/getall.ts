/**
 * Gets all events from the database only!
 * Used by dashboard to fetch all editable events.
 */

import { NextApiRequest, NextApiResponse } from "next";
import { BackendAuthService } from "../../../lib/backend_auth.service";
import { DatabaseService } from "../../../lib/db.service";

export default async function getall(req: NextApiRequest, res: NextApiResponse) {

  const bauth = new BackendAuthService()
  const authedUser = bauth.verifyToken(req)
  
  if ( !authedUser ) {
    res.status(401).send({ error: "Could not get events because user is not logged in" });
    return;
  }

  const db = new DatabaseService();
  let longName = ""
  await db.getHosts().then(hosts => {
    longName = hosts.filter( host => host.shortName === authedUser)[0].longName
  })

  await db.getEvents().then(result => {
    const filteredResult = result.filter( event => event.host === longName || authedUser === "admin" )
    res.status(200).json(filteredResult);
  }).catch(err => {
    res.status(500).json(err);
  })
}