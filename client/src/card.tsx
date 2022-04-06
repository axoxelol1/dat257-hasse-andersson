export default function Card() {
  return (
    <div className="border-2 border-black w-72 h-96 flex-col">
      <div className="bg-[url('./img/kingsman.jpg')] h-3/5"></div>
      <div className="relative h-2/5">
        <span className="font-bold text-lg">Bubbelprovning</span><br/>
        <span className="eventPrice">250 kr</span>
        <span className="eventPrice">A dope spy-movie about agents in the UK</span>
        <div className="absolute bottom-1 right-2 border-2 border-red-500">
          <span className="hostName">PU</span>
          <div className="bg-[url('./img/pu.jpg')] w-8 h-8 inline-block bg-cover"></div>
        </div>
      </div>
    </div>
  );
}