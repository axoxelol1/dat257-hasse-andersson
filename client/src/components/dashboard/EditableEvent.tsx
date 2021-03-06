/**
 * This component is used to list editable events in the dashboard
 * Needs handlers for delete and edit buttons, aswell as the event itself
 */

import { Event } from "../../../lib/types";
import { Icon } from '@iconify/react';

export interface EditableEventProps {
  event: Event;
  deleteHandler: (id: string, host: string) => void;
  editHandler: (event: Event) => void;
}

export default function EditableEvent(props: EditableEventProps) {

  function handleDelete() {
    confirm("Are you sure you want to delete this event?") && props.deleteHandler(props.event.id, props.event.host);
  }

  function handleEdit() {
    props.editHandler(props.event);
  }

  return(
    <div className="bg-white py-3 px-6 rounded-lg flex flex-col gap-y-2 md:flex-row justify-between place-items-center">
      <div>
        <div className="md:mb-3">
          <h1 className="text-2xl leading-none">{props.event.title}</h1>
        </div>
        <p className="text-base leading-none">{props.event.host}</p>
      </div>
      <div className="flex flex-row gap-x-2">
        <button onClick={handleDelete} className="hover:bg-red-500 transition-colors rounded p-1">
          <Icon icon="octicon:trash-16" width="24" height="24" />
        </button>
        <button onClick={handleEdit} className=" hover:bg-yellow-400 transition-colors rounded p-1">
          <Icon icon="octicon:pencil-16" width="24" height="24" />
        </button>
      </div>
    </div>
  )
}