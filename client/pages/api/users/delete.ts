import { NextApiRequest, NextApiResponse } from "next";
import { DatabaseService } from "../../../lib/db.service";
import { BackendAuthService } from "../../../lib/admin.service";

/*
  Retrieves all users from the database
  Only the admin user can do this
*/
export default async function getUsers(req: NextApiRequest, res: NextApiResponse) {
  const username = req.body.username

  if ( !username ) {
    res.status(400).send({ error: "Missing required fields. Required fields are: username" })
    return
  }

  const bauth = new BackendAuthService()
  const authedUser = bauth.verifyToken(req)
  
  if ( !authedUser ) {
    res.status(401).send({ error: "User not logged in" });
    return;
  }

  if ( authedUser !== "admin" ) {
    res.status(403).send({ error: "Only the administrator can delete users" });
    return;
  }

  const db = new DatabaseService()
  const user = await db.getUser(username)

  if ( !user ) {
    res.status(400).send({ error: "User does not exist" });
    return;
  }

  const result = await db.deleteUser(username)
  if (result.deletedCount) {
    res.status(200).send( { message: `User ${username} deleted successfully` } )
  } else {
    res.status(500).send( { error: "Database failed to delete user" } )
  }
}