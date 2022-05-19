import { ChangeEventHandler } from "react"

/**
 * A basic searchbar component.
 */

export type SearchbarProps = {
  searchHandler: ChangeEventHandler<HTMLInputElement>;
};


export default function Searchbar({searchHandler}: SearchbarProps) {
  return (
    <div className="flex flex-row h-12 w-full">
      <div className="h-full w-full">
        <input className="h-full w-full text-lg bg-transparent pl-2 outline-none border-b-black border-b-2 placeholder:text-black/80 placeholder:italic" type="text" placeholder="Search" onChange={searchHandler} />
      </div>
    </div>
  )
}