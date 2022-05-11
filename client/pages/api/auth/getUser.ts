import { NextApiRequest, NextApiResponse } from "next";
import { DatabaseService } from "../../../lib/db.service";
import { User } from "../../../lib/types";

/*
  Retrieves a user from the database
*/
export default async function addUser(req: NextApiRequest, res: NextApiResponse) {
  const db = new DatabaseService();
  const result = await db.getUser(username);
}