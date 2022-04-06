export default function Card() {
  return (
    <div className="border-2 border-black w-72 h-96">
      <div className="image"></div>
      <div className="textContainer">
        <span className="eventName">Bubbelprovning</span>
        <span className="eventPrice">250 kr</span>
        <div className="host">
          <span className="hostName">PU</span>
          <div className="hostImage"></div>
        </div>
      </div>
    </div>
  );
}