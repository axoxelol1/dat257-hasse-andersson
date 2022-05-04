import { useState } from "react"
import React from "react";


export default function Loginwindow() {

  const [isOpen, setIsOpen] = useState(false);

  return (

    <div className="">
    <div>
      <button onClick={() => setIsOpen(!isOpen)} className={`w-10 h-10 z-10 p-1 absolute right-4 top-4 transition  ${isOpen ? "opacity-20" : ""}`}>
        <img src="/img/bar-icon.png" alt="login-window" className=""/>
      </button>
    </div>
          { isOpen &&  (
              
              <div className="absolute right-2 top-3 w-60 h-64 bg-slate-300 border-zinc-700 border-2">
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
