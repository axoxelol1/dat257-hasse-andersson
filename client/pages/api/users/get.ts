import { NextApiRequest, NextApiResponse } from "next";
import { DatabaseService } from "../../../lib/db.service";
import { BackendAuthService } from "../../../lib/admin.service";

/*
  Retrieves all users from the database
  Only the admin user can do this
*/
export default async function getUsers(req: NextApiRequest, res: NextApiResponse) {

  const bauth = new BackendAuthService()
  const authedUser = bauth.verifyToken(req)
  
  if ( !authedUser ) {
    res.status(401).send({ error: "User not logged in" });
    return;
  }

  if ( authedUser !== "admin" ) {
    res.status(403).send({ error: "Only the administrator can retrieve users" });
    return;
  }

  const db = new DatabaseService()
  const allUsers = await db.getUsers()
  res.status(200).send(allUsers)
}