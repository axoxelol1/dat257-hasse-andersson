/**
 * Form used to add events manually to the database.
 */

import React, { useState } from "react";

interface EventFormProps {
  updateEventList: () => void;
}

export default function EventForm(props : EventFormProps) {

  const [isInsertError, setIsInsertError] = useState(false);

  // Form fields
  const [state, setState] = useState({
    title: "",
    host: "",
    date: "",
    time: "",
    link: "",
    imageLink: "",
    location: "",
  });

  // Update state on form change
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    })
  }

  async function submitEvent(event : React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    const response = await fetch("/api/events/add", {
      method: "POST",
      body: JSON.stringify({
          id: "dummy", // Its deleted in the database service class function and then autogenerated by mongodb
          title: state.title,
          host: state.host,
          date: state.date+" "+state.time,
          link: state.link, 
          eventImageUrl: state.imageLink,
          location: state.location
        })
    });

    if (!response.ok) {
      setIsInsertError(true);
      return;
    } else {
      setIsInsertError(false);
    }

    props.updateEventList();
    resetForm();
  }

  function isValidForm() {
    return state.title !== "" && state.host !== "" && state.date !== "" && state.link !== "";
  }

  // Clears fields and resets form
  function resetForm() {
    setState({
      title: "",
      host: "",
      date: "",
      time: "",
      link: "",
      imageLink: "",
      location: "",
    });

    document.querySelectorAll("input").forEach((input) => {
      input.value = "";
    });
  }

  return ( 
    <div className="md:w-1/3 h-full w-full">
      <span className="font-bold text-xl">Add event</span>
      <div className="md:w-full flex flex-col border-t-2 gap-4 py-2 border-black">
        <div className="h-8 w-full flex">
          <input className="h-8 grow rounded" type="text" placeholder="Title" name="title" onChange={handleChange}/>
          <span>*</span>
        </div>
        <div className="h-8 w-full flex">
          <input className="h-8 w-full rounded" type="text" placeholder="Host" name="host" onChange={handleChange}/>
          <span>*</span>
        </div>
        <div className="flex flex-row gap-x-2">
          <div className="h-8 w-2/3 flex">
            <input className="h-8 grow rounded" type="date" name="date" onChange={handleChange} />
            <span>*</span>
          </div>
          <input className="h-8 w-1/3 rounded" type="time" name="time" onChange={handleChange} />
        </div>
        <div className="h-8 w-full flex">
          <input className="h-8 grow rounded" type="text" placeholder="Link to event" name="link" onChange={handleChange}/>
          <span>*</span>
        </div>
        <input className="h-8 w-full rounded" type="text" placeholder="Link to image" name="imageLink" onChange={handleChange}/>
        <input className="h-8 w-full rounded" type="text" placeholder="Location" name="location" onChange={handleChange}/>
        {isInsertError && <span className="text-red-600">Failed to add event</span>}
        <span className="text-sm">* required fields</span>
        <div className="text-center">
          {
            isValidForm() ? 
            <button className="h-8 w-1/3 rounded text-white bg-green-600 hover:bg-green-500 transition-colors" onClick={submitEvent}>Add</button>
            :
            <button className="h-8 w-1/3 rounded text-white bg-slate-400 transition-colors" disabled>Add</button>
          }
        </div>
      </div>
    </div>
  )
}