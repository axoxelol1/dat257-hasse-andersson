import { NextApiRequest, NextApiResponse } from "next";
import { BackendAuthService } from "../../../lib/admin.service";

/*
  Takes in a JSON web token and checks against the JWT secret if it is valid. 
  If so it returns the payload in the token, which in this case is the username.
*/
export default async function verifyToken(req: NextApiRequest, res: NextApiResponse) {
  
  if (!process.env.JWT_SECRET) {
    res.status(503).send({ error: "Token encoding error" })
    return
  }

  const bauth = new BackendAuthService()
  const username = bauth.verifyToken(req)

  if (username) {
    res.status(200).json({username: username})
  } else {
    res.status(401).send({ error: "User not logged in or session expired" })
  }
}