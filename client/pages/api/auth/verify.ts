import { NextApiRequest, NextApiResponse } from "next";
import jwt, { JwtPayload } from "jsonwebtoken"

/*
  Takes in a JSON web token and checks against the JWT secret if it is valid. 
  If so it returns the payload in the token, which in this case is the username.
*/
export default async function verifyToken(req: NextApiRequest, res: NextApiResponse) {
  
  if (!process.env.JWT_SECRET) {
    res.status(500).json({error: "Token encoding error"})
    throw new Error("Missing JWT secret in .env.local")
  }

  const { cookies } = req //Picks out the cookies from the request using object destructuring
  const token = cookies.JWT

  try {
    const payload = (jwt.verify(token, process.env.JWT_SECRET) as JwtPayload)
    const username = payload.username
    res.status(200).json({username: username})
  } catch(err) {
    console.log(err)
    res.status(401).json({error: "User not logged in or session expired"})
  }
}