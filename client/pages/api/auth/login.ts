import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken"
import cookie from "cookie"

/*
  Creates a JSON web token with the username as the payload. Expiry time can be changed.
  The function returns the token encoded with the given JWT secret.
*/
export default async function createTokenAndCookie(req: NextApiRequest, res: NextApiResponse) {
  
  if (!process.env.JWT_SECRET) {
    throw new Error("Missing JWT secret in .env.local")
  }

  const username = JSON.parse(req.body).username
  const token = jwt.sign({username: username}, process.env.JWT_SECRET, {expiresIn: "200s"}) // <- These two values should be the same 

  const serialized = cookie.serialize("JWT", token, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 200,                                                                            // <- These two values should be the same
    path: "/"
  })

  res.setHeader("Set-Cookie", serialized)
  res.json({success: true})
}