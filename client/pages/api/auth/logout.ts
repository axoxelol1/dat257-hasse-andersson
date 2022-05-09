import { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie"

/*
  Logs the user out by creating a cookie with the same name ("JWT") and setting its maxAge to -1
*/
export default async function logout(req: NextApiRequest, res: NextApiResponse) {

  const serialized = cookie.serialize("JWT", null, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: -1,
    path: "/"
  })

  res.setHeader("Set-Cookie", serialized)
  res.json({success: true})
}