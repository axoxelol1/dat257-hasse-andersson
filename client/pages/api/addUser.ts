import { NextApiRequest, NextApiResponse } from "next";
import { DatabaseService } from "../../lib/db.service";
import { User } from "../../lib/types";

export default async function add(req: NextApiRequest, res: NextApiResponse) {
  const user: User = JSON.parse(req.body);

  if (!inputIsValid(user)) {
    res.status(400).send({ error: "Missing required fields. Required fields are: username, salthash" });
    return;
  }

  const db = new DatabaseService();
  const result = await db.addUser(user);
  if (result.acknowledged) {
    res.status(200).send({ message: "Event added successfully" });
  } else {
    res.status(500).send({ error: "Failed to add event" });
  }
}

function inputIsValid(user: User): boolean {
  return user.username !== "" && user.salthash !== "";
}