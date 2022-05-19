import { Dispatch, SetStateAction, useState } from "react"
import { Host, Event } from "../../lib/types";

/*
  A component that takes a list of events, then by selecting certain criteria it returns events matching those criteria.
  Currently only for filtering on specific hosts.
*/

interface FiltersProps {
  eventSetter: Dispatch<SetStateAction<Event[]>>,
  events: Event[],
  hosts: Host[],
}

export default function Filters(props: FiltersProps) {
  return (
    <div className="flex flex-row h-12 w-fit">
      <HostFilter {...props} />
    </div>
  )
}

function HostFilter({eventSetter: setEvents, events: events, hosts: hosts}: FiltersProps) {

  const [isOpen, setIsOpen] = useState(false);
  const [selectedHosts, setSelectedHosts] = useState([])
  const [query, setQuery] = useState('')
  
  const hostList: string[] = hosts.map(host => host.shortName)
  
  const filteredHosts: string[] =
    query === '' 
      ? hostList 
      : hostList.filter((host) => host.toLowerCase().includes(query.trim().toLowerCase()))

  function handleHostClick(e: React.MouseEvent<HTMLElement>) {
    const clickedHost: string = e.currentTarget.dataset.hostName
    const updatedSelection: string[] = 
      isSelected(clickedHost) 
        ? selectedHosts.filter(h => h !== clickedHost)
        : [e.currentTarget.dataset.hostName, ...selectedHosts]
    setSelectedHosts(updatedSelection)
    setEvents(getFilteredEvents(updatedSelection))
  }

  function isSelected(h: string): boolean {
    return selectedHosts.includes(h);
  }

  function getFilteredEvents(hosts: string[]) {
    const filteredEvents = events.filter( e => hosts.includes( getShortName(e.host) ) )
    return hosts.length ? filteredEvents : events
  }

  function getShortName(longName: string): string {
    let shortName = ''
    hosts.forEach(host => {
      if (host.longName === longName) {
        shortName = host.shortName
      }
    })
    return shortName
  }

  function handleInputText(e: React.ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value)
  }

  return (
    <div className="z-10">
      <div className="h-full relative">
        <input type="text" placeholder="Filter" className="bg-transparent text-lg h-full pl-2 outline-none border-transparent border-b-black border-b-2 placeholder:text-black/80 placeholder:italic" onClick={() => setIsOpen(true)} onChange={handleInputText} />
        <button onClick={() => setIsOpen(!isOpen)} className={`w-8 h-8 p-1 absolute right-1 top-2 transition ${isOpen ? "rotate-180" : ""}`}>
          <img src="/img/arrow.svg" alt="Downward-facing small arrow" className="w-full h-full"/>
        </button>
      </div>
      <ul className="flex flex-col bg-gray-50/95 md:bg-transparent last:rounded-b">
        {isOpen && filteredHosts.sort((a,b) => (a > b) ? 1 : -1).map((host) => (          
          <li onClick={handleHostClick} data-host-name={host} key={host} className="rounded-sm hover:bg-gray-200/80 p-1 md:p-0.5">
            <input type="checkbox" checked={isSelected(host)} readOnly className="accent-stone-700 ml-1"/>
            <span className={`${isSelected(host) ? "font-semibold" : "font-normal"} ml-2 select-none`}>{host}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}