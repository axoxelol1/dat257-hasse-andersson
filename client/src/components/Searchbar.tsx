import { useEffect, useState } from "react"

export default function Searchbar() {
  return (
    <div className="flex flex-row h-12 w-full mb-2">
      <SearchbarInput />
    </div>
  )
}

function SearchbarInput() {
  const [query, setQuery] = useState("")

  useEffect(() => {
    console.log(query);
  }, [query])

  function changeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setQuery(event.target.value);
  }

  return (
    <div className="h-full w-full">
      <input className="h-full w-full border-transparent border-b-black border-2" type="text" placeholder="Search" onChange={changeHandler} />
    </div>
  )
}