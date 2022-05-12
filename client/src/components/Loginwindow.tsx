import { useState } from "react"
import React from "react"
import { User } from "../../lib/types"
import { AuthService } from "../../lib/auth.service"

export default function Loginwindow({users: users}: {users: User[]}) {

  const auth = new AuthService()

  const createUser = () => {

    const name: string = (document.getElementById("name") as HTMLInputElement).value
    const pw: string = (document.getElementById("pw") as HTMLInputElement).value

    if (name === '' || pw === '') {
      console.log(`Input fields empty`)
      return
    }

    auth.createUser(name, pw)
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
    <div className="">
      <div>
        <button onClick={() => setIsOpen(!isOpen)} className={`w-10 h-10 z-10 p-1 absolute right-4 top-4 transition  ${isOpen ? "opacity-20" : ""}`}>
          <img src="/img/bar-icon.png" alt="login-window" className="" />
        </button>
      </div>
      {isOpen && (
        <div className="absolute right-2 top-3 w-60 h-64 bg-slate-300 border-zinc-700 border-2">
          <div className="font-bold m-4">
            Login to your profile
          </div>
          <div className="m-4">
            <p> Username: </p>
            <input type={"username"} id="name"></input>
          </div>

          <div className="m-4 items-center">
            <p>Password: </p>
            <input type={"password"} id="pw"></input>
          </div>

          <div className="flex absolute m-4 gap-2">
            <button className="border-2 border-zinc-800" onClick={createUser}>
              Create user
            </button>
            <button className="border-2 border-zinc-800" onClick={login}>
              Login
            </button>
            <button className="border-2 border-zinc-800" onClick={logout}>
              Logout
            </button>
          </div>

        </div>
      )}
    </div>
  )
}
