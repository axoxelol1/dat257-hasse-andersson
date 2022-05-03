import { NextApiResponse } from "next";
import { createIcsCalendar } from "../../lib/calendar";
import { DataService } from "../../lib/data.service";

export default async function ics(_: never, res: NextApiResponse) {
  const { error, value } = createIcsCalendar(
    await new DataService().getEvents()
  );

  if (error) {
    res.status(500).send(error);
  }

  res.status(200).send(value);
}
