import { NextApiRequest, NextApiResponse } from "next";
import { DatabaseService } from "../../../lib/db.service";
import { User } from "../../../lib/types";
import bcrypt from "bcrypt"
import { BackendAuthService } from "../../../lib/backend_auth.service";

/*
  Adds a user to the database using a database service
  Hashes password before adding user
*/
export default async function addUser(req: NextApiRequest, res: NextApiResponse) {
  const username = req.body.username
  const clientHash = req.body.hashedPassword

  if ( !(username && clientHash) ) {
    res.status(400).send({ error: "Missing required fields. Required fields are: username, hashedPassword" })
    return
  }

  const bauth = new BackendAuthService()
  const authedUser = bauth.verifyToken(req)
  
  if ( !authedUser ) {
    res.status(401).send({ error: "User not logged in" });
    return;
  }

  if ( authedUser !== "admin" ) {
    res.status(403).send({ error: "Only the administrator can add new users" });
    return;
  }

  const db = new DatabaseService()
  if ( await db.getUser(username) ) {
    res.status(400).send({ error: "User already exists" })
    return
  }

  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(clientHash, salt, async function(err, hash) {
      const user: User = { username: username, salthash: hash}

      const result = await db.addUser(user)
      if (result.acknowledged) {
        res.status(201).send({ message: "User added succesfully"})
      } else {
        res.status(500).send({ error: "Database failed to add user" })
      }
    })
  })
}