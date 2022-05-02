/**
 * Form used to add events manually to the database.
 */

import React, { useState } from "react";

interface EventFormProps {
  updateEventList: () => void;
}

export default function EventForm(props : EventFormProps) {

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
    await fetch("http://localhost:3000/api/events/add", {
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
    props.updateEventList();
    resetForm();
  }

  function isValidForm() {
    return state.title !== "" && state.host !== "" && state.date !== "" && state.time !== "";
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
        <input className="h-8 w-full rounded" type="text" placeholder="Title" name="title" onChange={handleChange}/>
        <input className="h-8 w-full rounded" type="text" placeholder="Host" name="host" onChange={handleChange}/>
        <div className="flex flex-row gap-x-2">
          <input className="h-8 w-2/3 rounded" type="date" name="date" onChange={handleChange}/>
          <input className="h-8 w-1/3 rounded" type="time" name="time" onChange={handleChange}/>
        </div>
        <input className="h-8 w-full rounded" type="text" placeholder="Link to event" name="link" onChange={handleChange}/>
        <input className="h-8 w-full rounded" type="text" placeholder="Link to image" name="imageLink" onChange={handleChange}/>
        <input className="h-8 w-full rounded" type="text" placeholder="Location" name="location" onChange={handleChange}/>
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