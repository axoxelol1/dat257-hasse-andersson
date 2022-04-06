import clientPromise from "../../lib/mongodb";

export default async function testDatabase(req, res) {
    const client = await clientPromise;
    const result = client.db("testing").collection("events").find({})

    res.status(200).json(result)
    
  }