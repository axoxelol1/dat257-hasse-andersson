import clientPromise from "../../lib/mongodb";

//Retrieves all events
//Can be accessed at .../api/example
export default async function getAllEvents(req, res) {
  const client = await clientPromise;
  const result = await client.db("campusapp").collection("events").find({}).toArray()

  res.status(200).json(result)
}