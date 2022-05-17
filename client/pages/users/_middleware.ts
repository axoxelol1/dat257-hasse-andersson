import { NextRequest, NextResponse } from 'next/server'
import * as jose from "jose"

/*
  Intercepts requests to pages in its directory and handles the requests accordingly
*/
export async function middleware(req: NextRequest) {
  const token = req.cookies?.JWT

  try {
    //Using jose instad of the normal JWT-library since JWT can't run in Edge Runtime where this middleware happens
    const { payload: payload } = await jose.jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET))

    //Only admin can access the addUser page
    if (payload.username !== "admin") {
      return NextResponse.json("User has wrong privileges")
    }

    return NextResponse.next()
  } catch {
    return NextResponse.json("User not logged in")
  }
}