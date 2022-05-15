/**
 * Form used to add events manually to the database.
 */

import React, { useEffect, useState } from "react";
import { Host, Event } from "../../../lib/types";
import Select from 'react-select';
import { AuthService } from "../../../lib/auth.service";

interface EventFormProps {
  updateEventList: () => void;
  onSubmit: (event : Event) => Promise<Response>;
  hosts: Host[];
  event: Event;
}

export default function EventForm( {hosts, event, onSubmit} : EventFormProps) {

  const [isInsertError, setIsInsertError] = useState(false);
  
  let date: string;
  let time: string;

  try{
    date = new Date(event.date).toISOString().split('T')[0];
    time = new Date(event.date).toLocaleString('sv-SE', {
      hour: '2-digit',
      minute: '2-digit'
    })
  } catch(e) {
    date = "";
    time = "";
  }

  // Form fields
  const [state, setState] = useState({
    title: event.title,
    host: event.host,
    date: date,
    time: time,
    link: event.link,
    eventImageUrl: event.eventImageUrl,
    location: event.location,
  });

  // Update state on form change
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    })
  }

  // Update host on select change
  function handleSelectChange(newValue : {label : string, value : string}) {
    setState({
      ...state,
      host: newValue.value,
    })
  }


  // Creates select options for hosts
  const [authedUser, setAuthedUser] = useState("")
  useEffect(() => {
    new AuthService().verify().then(setAuthedUser)
  }, [])
  const hostSelectOptions = hosts.filter( host => {
    return host.shortName === authedUser
  }).map((host) => {
    return {label: host.longName, value: host.longName};
  })

  // Add default option
  hostSelectOptions.unshift({label: "Select host", value: ""});

  async function submitEvent(mouseEvent : React.MouseEvent<HTMLButtonElement>) {
    mouseEvent.preventDefault();

    const response = await onSubmit({
      ...state,
      id: event.id,
      date: state.date + " " + state.time
    });

    if (!response.ok) {
      setIsInsertError(true);
    } else {
      setIsInsertError(false);
    }

    resetForm();
  }

  function isValidForm() {
    return state.title !== "" && state.host !== "" && state.date !== "" && state.link !== "";
  }

  // Clears fields and resets form
  function resetForm() {
    setState({
      ...state,
      title: "",
      date: "",
      time: "",
      link: "",
      eventImageUrl: "",
      location: ""
    });

    document.querySelectorAll("input").forEach((input) => {
      input.value = "";
    });
  }

  return ( 
    <div className="md:w-full flex flex-col gap-4 py-2">

      {/* Title */}
      <div className="h-8 w-full flex">
        <input className="h-8 grow rounded" type="text" placeholder="Title" name="title" value={state.title} onChange={handleChange}/>
        <span>*</span>
      </div>

      {/* Host */}
      {state.host != "" && 
      <div className="h-8 w-full flex">
        <Select 
          className="h-8 grow rounded"
          options={hostSelectOptions}
          onChange={handleSelectChange}
          defaultValue={{label: state.host, value: state.host}}
          isSearchable={true}
          instanceId="hostSelect"
        />
        <span>*</span>
      </div>}
      {state.host == "" &&
      <div className="h-8 w-full flex">
        <Select 
          className="h-8 grow rounded"
          options={hostSelectOptions}
          onChange={handleSelectChange}
          defaultValue={hostSelectOptions[0]}
          isSearchable={true}
          instanceId="hostSelect"
        />
        <span>*</span>
      </div>}

      {/* Date and time */}
      <div className="flex flex-row gap-x-2">
        <div className="h-8 w-2/3 flex">
          <input className="h-8 grow rounded" type="date" name="date" value={state.date} onChange={handleChange} />
          <span>*</span>
        </div>
        <input className="h-8 w-1/3 rounded" type="time" name="time" value={state.time} onChange={handleChange} />
      </div>

      {/* Link */}
      <div className="h-8 w-full flex">
        <input className="h-8 grow rounded" type="text" placeholder="Link to event" name="link" value={state.link} onChange={handleChange}/>
        <span>*</span>
      </div>

      {/* Image link */}
      <input className="h-8 w-full rounded" type="text" placeholder="Link to image" name="eventImageUrl" value={state.eventImageUrl} onChange={handleChange}/>

      {/* Location */}
      <input className="h-8 w-full rounded" type="text" placeholder="Location" name="location" value={state.location} onChange={handleChange}/>

      {isInsertError && <span className="text-red-600">Failed to add event</span>}
      <span className="text-sm">* required fields</span>

      <div className="text-center">
        {
          isValidForm() ? 
          <button className="h-8 w-1/3 rounded text-white bg-green-600 hover:bg-green-500 transition-colors" onClick={submitEvent}>Save</button>
          :
          <button className="h-8 w-1/3 rounded text-white bg-slate-400 transition-colors" disabled>Save</button>
        }
      </div>
    </div>
  )
}