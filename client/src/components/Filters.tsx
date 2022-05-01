import { Combobox } from "@headlessui/react"
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

  const filteredHosts =
    query === ''
      ? hostList
      : hostList.filter((host) => {
          return host.toLowerCase().includes(query.trim().toLowerCase())
        })

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

  //The following three functions handle multiselect, because Headless UI does not support it out of the box.
  function isSelected(value) {
    return selectedHosts.find((el) => el === value) ? true : false;
  }

  function handleSelect(value) {
    if (!isSelected(value)) {
      const selectedHostsUpdated = [
        ...selectedHosts,
        hostList.find((el) => el === value)
      ];
      setSelectedHosts(selectedHostsUpdated)
      const filteredEvents = getFilteredEvents(selectedHostsUpdated)
      setEvents(filteredEvents)
    } else {
      handleDeselect(value);
    }
    setIsOpen(true);
  }

  function handleDeselect(value) {
    const selectedHostsUpdated = selectedHosts.filter((el) => el !== value)
    setSelectedHosts(selectedHostsUpdated)
    const filteredEvents = getFilteredEvents(selectedHostsUpdated)
    setEvents(filteredEvents)
    setIsOpen(true);
  }

  function handleFilterClick(e) {
    setIsOpen(!isOpen)
    e.target.value = ''
  }

  function handleFilterBlur(e) {
    e.target.value = 'Filter'
  }

  return (
    <div>
      <Combobox value="Filter" onChange={(value) => handleSelect(value)}>
        <Combobox.Input onChange={(event) => setQuery(event.target.value)} onMouseDown={handleFilterClick} onBlur={handleFilterBlur} className="h-full font-bold text-lg outline-none border-transparent border-b-black border-2"/>
        {isOpen && (
          <Combobox.Options static className="mt-2">
            {filteredHosts.map((host) => (
              <Combobox.Option key={host} value={host}>
                <input type="checkbox" checked={isSelected(host)} readOnly className="accent-stone-900 ml-1"/>
                <span className={`${isSelected(host) ? "font-semibold" : "font-normal"} ml-2`}>{host}</span>
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
      </Combobox>
    </div>
  )
}