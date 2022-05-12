import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken"
import cookie from "cookie"
import bcrypt from "bcrypt"
import { DatabaseService } from "../../../lib/db.service";
import { User } from "../../../lib/types";

/*
  First verifies login details
  If valid, creates a JSON web token with the username as the payload. Expiry time can be changed.
  The function returns the token encoded with the given JWT secret.
*/
export default async function login(req: NextApiRequest, res: NextApiResponse) {

  const TOKEN_EXPIRATION = 200 // Time in seconds

  const username = req.body.username
  const clientHash = req.body.hashedPassword

  if ( !(username && clientHash) ) {
    res.status(400).send({ error: "Missing required fields. Required fields are: username, hashedPassword" })
    return
  }

  const db = new DatabaseService()
  const user: User = await db.getUser(username)

  if ( !user ) {
    res.status(404).send({ error: "User does not exists" })
    return
  }

  const hash = user.salthash
  bcrypt.compare(clientHash, hash, async function(err, response) {
    if (!response) {
      res.status(400).send({ error: "Wrong password" })
      return
    } else {

      if (!process.env.JWT_SECRET) {
        res.status(503).send({ error: "Token encoding error" })
        return
      }
    
      const token = jwt.sign({username: username}, process.env.JWT_SECRET, {expiresIn: TOKEN_EXPIRATION + "s"})
    
      const serialized = cookie.serialize("JWT", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: TOKEN_EXPIRATION,
        path: "/"
      })
    
      res.setHeader("Set-Cookie", serialized)
      res.status(200).send( { message: "User logged in, authorization token set in cookies" } )
    }
  })
}