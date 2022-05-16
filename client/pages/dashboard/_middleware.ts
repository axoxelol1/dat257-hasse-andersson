import { NextRequest, NextResponse } from 'next/server'
import jose from "jose"

/*
  Intercepts requests to pages in its directory and handles the requests accordingly
*/

export function middleware(req: NextRequest) {
  const token = req.cookies?.JWT

  try {
    //Using jose instad of the normal JWT-library since JWT can't run in Edge Runtime where this middleware happens
    jose.jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET))

    //If token is invalid, an error is thrown sending us to the catch-statement
    return NextResponse.next()
  } catch {
    return NextResponse.json("User not logged in")
  }
}