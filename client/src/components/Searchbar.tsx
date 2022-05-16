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
        <input className="h-full w-full border-transparent border-b-black border-2" type="text" placeholder="Search" onChange={searchHandler} />
      </div>
    </div>
  )
}