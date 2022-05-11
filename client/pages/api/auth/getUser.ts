import { NextApiRequest, NextApiResponse } from "next";
import { DatabaseService } from "../../../lib/db.service";

/*
  Retrieves a user from the database
*/
export default async function getUser(req: NextApiRequest, res: NextApiResponse) {
    const username = JSON.parse(req.body).username

    console.log(username + " från getuser")

    const db = new DatabaseService()
    const result = await db.getUser(username)
    console.log(await result + " från get user 2")
    if (result) {
      res.status(404)
    } else {
      res.status(200).send( { user: (await result) } )
    }
}