import { Combobox } from "@headlessui/react"
import { useState } from "react"

export default function Filters() {
  return (
    <div className="flex flex-row h-12 w-fit">
      <HostFilter />
    </div>
  )
}

const hosts = [
  'PU',
  'Festu',
  'Svea Skivgarde',
  'Marskalksämbetet'
]

function HostFilter() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedHosts, setSelectedHosts] = useState([])
  const [query, setQuery] = useState('')

  const filteredHosts =
    query === ''
      ? hosts
      : hosts.filter((host) => {
          return host.toLowerCase().includes(query.trim().toLowerCase())
        })

  //The following three functions handle multiselect, because Headless UI does not support it out of the box.
  function isSelected(value) {
    return selectedHosts.find((el) => el === value) ? true : false;
  }

  function handleSelect(value) {
    if (!isSelected(value)) {
      const selectedPersonsUpdated = [
        ...selectedHosts,
        hosts.find((el) => el === value)
      ];
      setSelectedHosts(selectedPersonsUpdated);
    } else {
      handleDeselect(value);
    }
    setIsOpen(true);
  }

  function handleDeselect(value) {
    const selectedPersonsUpdated = selectedHosts.filter((el) => el !== value);
    setSelectedHosts(selectedPersonsUpdated);
    setIsOpen(true);
  }

  return (
    <div>
      <Combobox value="Filter" onChange={(value) => handleSelect(value)}>
        <Combobox.Input onChange={(event) => setQuery(event.target.value)} onMouseDown={() => {setIsOpen(!isOpen)}} className="h-full font-bold text-lg outline-none border-transparent border-b-black border-2"/>
        {isOpen && (
          <Combobox.Options static className="mt-2 bg-white">
            {filteredHosts.map((host) => (
              <Combobox.Option key={host} value={host}>
                <input type="checkbox" checked={isSelected(host)} readOnly className="accent-stone-900 ml-1"/>
                <span className={`${isSelected(host) ? "font-semibold" : "font-normal"} ml-2`}>{host}</span>
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
      </Combobox>

      {/* This displays the list of current selected options. */}
      <div className="pt-5">
        {selectedHosts.map((host) => (
          <p key={host}>{host}</p>
        ))}
      </div>

    </div>
  )
}