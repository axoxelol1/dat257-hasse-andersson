import { useState } from "react"
import React from "react"
import { AuthService } from "../../lib/auth.service"
import { Icon } from "@iconify/react"


export default function Loginwindow() {

  const auth = new AuthService()

  const addUser = () => {

    const name: string = (document.getElementById("name") as HTMLInputElement).value
    const pw: string = (document.getElementById("pw") as HTMLInputElement).value

    if (name === '' || pw === '') {
      console.log(`Input fields empty`)
      return
    }

    auth.addUser(name, pw)
  }
  
  const login = () => {
    const name: string = (document.getElementById("name") as HTMLInputElement).value
    const pw: string = (document.getElementById("pw") as HTMLInputElement).value

    if (name === '' || pw === '') {
      console.log(`Input fields empty`)
      return
    }

    auth.login(name, pw)
  }

  const logout = async () => {
    auth.logout()
  }


  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-full">
          <button onClick={() => setIsOpen(!isOpen)} className={`flex justify-center items-center h-full w-30 transition ${isOpen ? "opacity-20" : ""}`}>
            <Icon className="mr-2" icon="octicon:person-16" width={24} height={24}/>
            <span className="font-medium text-xl">Login</span>
          </button>
        { isOpen &&  (  
          <div className="absolute right-4 top-20 w-64 h-64 bg-slate-300 border-zinc-700 border-2">
            <div className="font-bold m-4">
                Login to your profile
            </div>
              <div className="m-4">
                <p> Email: </p>
                <input className="rounded-md" type={"email"}></input>
              </div>

              <div className="m-4 items-center">
                <p>Password: </p>
                <input className="rounded-md" type={"password"}></input>
              </div>

              <button onClick={login} className="py-1 px-3 rounded-md absolute right-20 m-4 border-2 border-zinc-800 ">
                  Login
              </button>
          </div>
        )}
    </div>
  )    
}
