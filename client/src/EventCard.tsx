type Committee = {
  name: string;
  imageUrl: string;
};

export type EventCardProps = {
  title: string;
  description: string;
  thumbnailUrl: string;
  price?: string;
  link?: string;
  committee?: Committee;
};

export default function EventCard({
  thumbnailUrl,
  title,
  description,
  price,
  link,
  committee,
}: EventCardProps) {
  const Thumbnail = ({ src }: { src: string }) => (
    <div
      className="w-full bg-cover grow-[3]"
      style={{ backgroundImage: `url("${src}")` }}
    />
  );

  return (
    <article className="border-2 border-black inline-flex flex-col aspect-[2/3] w-72">
      <Thumbnail src={thumbnailUrl} />
      <div className="grow-[2] basis-0 p-4 flex flex-col gap-4 justify-between">
        <div>
          <h1 className="font-bold text-lg">{title}</h1>
          <h2 className="font-semibold">{price}</h2>
        </div>
        <p>{description}</p>
        <div className="flex flex-row justify-between">
          <a href={link} className="text-blue-800 hover:underline">
            Länk
          </a>
          <Committee {...committee} />
        </div>
      </div>
    </article>
  );
}

function Committee({ name, imageUrl }: Committee) {
  return (
    <div className="bottom-3 right-3 flex flex-row place-items-center gap-2">
      <span className="font-semibold">{name}</span>
      <div
        className="w-8 h-8 rounded-full inline-block bg-cover"
        style={{ backgroundImage: `url("${imageUrl}")` }}
      />
    </div>
  );
}
