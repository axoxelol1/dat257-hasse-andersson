import { NextApiRequest, NextApiResponse } from "next";
import { DatabaseService } from "../../../lib/db.service";
import { User } from "../../../lib/types";

/*
  Adds a user to the database using a database service
*/
export default async function addUser(req: NextApiRequest, res: NextApiResponse) {
  const user: User = JSON.parse(req.body);

  if (!inputIsValid(user)) {
    res.status(400).send({ error: "Missing required fields. Required fields are: username, salthash" })
    return
  }

  const db = new DatabaseService();
  const result = await db.addUser(user);
  if (result.acknowledged) {
    res.status(201)
  } else {
    res.status(500).send({ error: "Database failed to add user" })
  }
}

function inputIsValid(user: User): boolean {
  return user.username !== "" && user.salthash !== "";
}