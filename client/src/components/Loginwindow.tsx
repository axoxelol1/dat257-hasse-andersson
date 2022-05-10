import { useState } from "react"
import React from "react";
import { Icon } from "@iconify/react"


export default function Loginwindow() {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div>
        <button onClick={() => setIsOpen(!isOpen)} className={`transition  ${isOpen ? "opacity-20" : ""}`}>
          <Icon icon="octicon:person-16" width={24} height={24} className=""/>
        </button>
      </div>
        { isOpen &&  (  
          <div className="absolute right-2 top-3 w-64 h-64 bg-slate-300 border-zinc-700 border-2">
            <div className="font-bold m-4">
                Login to your profile
            </div>
              <div className="m-4">
                <p> Email: </p>
                <input type={"email"}></input>
              </div>

              <div className="m-4 items-center">
                <p>Password: </p>
                <input type={"password"}></input>
              </div>

              <button className="absolute right-20 m-4 border-2 border-zinc-800 ">
                  Login
              </button>
          </div>
        )}
    </div>
  )    
}
