import EventCard, { EventCardProps } from "../src/EventCard";

const theKingsManPU: EventCardProps = {
  thumbnailUrl: "./img/kingsman.jpg",
  title: "PU-Movie: The King's Man",
  price: "40 kr",
  description: "A dope spy-movie about agents in the UK.",
  link: "https://www.facebook.com/events/340855818101825/?ref=newsfeed",
  committee: {
    name: "PU",
    imageUrl: "./img/pu.jpg",
  },
};

export default function Index() {
  return (
    <div className="p-8">
      <EventCard {...theKingsManPU} />
    </div>
  );
}
