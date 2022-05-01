import { useState } from "react"

export default function Filters({eventSetter: setEvents, events: events, hosts: hosts}) {
  return (
    <div className="flex flex-row h-12 w-fit">
      <HostFilter eventSetter={setEvents} events={[...events]} hosts={hosts}/> {/* Passes on all props */}
    </div>
  )
}

function HostFilter({eventSetter: setEvents, events: events, hosts: hosts}) {

  const hostList: string[] = hosts.map(host => host.shortName)

  const [isOpen, setIsOpen] = useState(false);
  const [selectedHosts, setSelectedHosts] = useState([])
  const [query, setQuery] = useState('')

  function isSelected(h: string): boolean {
    return selectedHosts.includes(h);
  }

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

  function handleInputText(e: React.ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value)
  }

  function handleArrowClick() {
    setIsOpen(!isOpen)
  }

  function handleTextClick() {
    setIsOpen(true)
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
  
  function getFilteredEvents(hosts: string[]) {
    const filteredEvents = events.filter( e => hosts.includes( getShortName(e.host) ) )
    return hosts.length ? filteredEvents : events
  }

  return (
    <div>
      <div className="h-full relative">
        <input type="text" placeholder="Filter" onClick={handleTextClick} onChange={handleInputText} className="h-full outline-none border-transparent border-b-black border-2" />
        <button onClick={handleArrowClick} className={`w-8 h-8 p-1 absolute right-1 top-2 transition ${isOpen ? "rotate-180" : ""}`}>
          <img
              src="/img/arrow.svg"
              alt="Website logo"
              className="w-full h-full"
            />
        </button>
      </div>
      <ul className="flex flex-col">
        {isOpen && filteredHosts.map((host) => (          
          <li onClick={handleHostClick} data-host-name={host} key={host} className="rounded-sm hover:bg-gray-200">
            <input type="checkbox" checked={isSelected(host)} readOnly className="accent-stone-700 ml-1"/>
            <span className={`${isSelected(host) ? "font-semibold" : "font-normal"} ml-2 select-none`}>{host}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}