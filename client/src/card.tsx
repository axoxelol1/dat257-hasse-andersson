export default function Card() {
  return (
    <div className="border-2 border-black w-72 h-96 flex-col">

      <div className="bg-[url('./img/kingsman.jpg')] h-3/5 bg-cover"></div>

      <div className="relative h-2/5">

        <span className="font-bold text-lg m-2">PU-Movie: The King's Man</span><br/>
        <span className="m-4">40 kr</span>

        <div className="absolute bottom-1 right-2">
          <span className="">PU</span>
          <div className="bg-[url('./img/pu.jpg')] w-8 h-8 rounded-full inline-block bg-cover"></div>
        </div>

      </div>
      
    </div>
  );
}