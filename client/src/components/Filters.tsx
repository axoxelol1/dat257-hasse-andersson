/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { Host } from "../../lib/types";

/*
  A component that takes a list of events, then by selecting certain criteria it returns events matching those criteria.
  Currently only for filtering on specific hosts.
*/

interface FiltersProps {
  onChange: (hosts: Host[]) => void;
  hosts: Host[];
}

export default function Filters(props: FiltersProps) {
  return (
    <div className="flex flex-row h-12">
      <HostFilter {...props} />
    </div>
  );
}

function HostFilter({ onChange, hosts }: FiltersProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedHosts, setSelectedHosts] = useState<Host[]>([]);
  const [query, setQuery] = useState("");

  const filteredHostsList = filterHosts(hosts, query);

  function handleHostClick(e: React.MouseEvent<HTMLElement>) {
    const clickedHostName = e.currentTarget.dataset.hostName;
    const clickedHost = filteredHostsList.find(
      ({ shortName }) => shortName === clickedHostName
    );

    const updatedSelection = isSelected(clickedHostName)
      ? selectedHosts.filter((h) => h.shortName !== clickedHostName)
      : [clickedHost, ...selectedHosts];

    setSelectedHosts(updatedSelection);
    onChange(updatedSelection);
  }

  function isSelected(h: string): boolean {
    return selectedHosts.some(({ shortName }) => shortName.includes(h));
  }

  function handleInputText(e: React.ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);
  }

  return (
    <div className="z-10">
      <div className="h-full relative">
        <input
          type="text"
          placeholder="Filter"
          className="bg-transparent text-lg h-full pl-2 outline-none border-transparent border-b-black border-b-2 placeholder:text-black/80 placeholder:italic"
          onClick={() => setIsOpen(true)}
          onChange={handleInputText}
        />
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-8 h-8 p-1 absolute right-1 top-2 transition ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <img
            src="/img/arrow.svg"
            alt="Downward-facing small arrow"
            className="w-full h-full"
          />
        </button>
      </div>
      <ul className="flex flex-col bg-gray-50/95 md:bg-transparent last:rounded-b">
        {isOpen &&
          filteredHostsList.map((host) => (
            <li
              onClick={handleHostClick}
              data-host-name={host.shortName}
              key={host.shortName}
              className="rounded-sm hover:bg-gray-200/80 p-1 md:p-0.5"
            >
              <input
                type="checkbox"
                checked={isSelected(host.shortName)}
                readOnly
                className="accent-stone-700 ml-1"
              />
              <span
                className={`${
                  isSelected(host.shortName) ? "font-semibold" : "font-normal"
                } ml-2 select-none`}
              >
                {host.shortName}
              </span>
            </li>
          ))}
      </ul>
    </div>
  );
}

function filterHosts(hosts: Host[], query: string): Host[] {
  if (query == "") {
    return hosts;
  }

  return hosts.filter(({ shortName }) =>
    shortName.toLowerCase().includes(query.trim().toLowerCase())
  );
}
