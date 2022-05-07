import { useState } from "react"
import bcrypt from "bcryptjs"
import React from "react"
import { User } from "../../lib/types"

export default function Loginwindow({users: users}: {users: User[]}) {

  const userExists = (name: string): boolean => {
    let userExists = false

    users.forEach(u => {
      if (u.username === name) userExists = true
    })

    return userExists
  }

  const getHash = (name: string) => {
    let hash = ''
    users.forEach(u => {
      if (u.username === name) hash = u.salthash
    })
    return hash
  }

  const createUser = () => {

    const name: string = (document.getElementById("name") as HTMLInputElement).value
    const pw: string = (document.getElementById("pw") as HTMLInputElement).value

    if (userExists(name)) {
      console.log(`User ${name} already exists`)
      return
    }

    if (name === '' || pw === '') {
      console.log(`Input fields empty`)
      return
    }

    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(pw, salt, async function(err, hash) {

        const response = await fetch("/api/auth/addUser", {
          method: "POST",
          body: JSON.stringify({
              username: name,
              salthash: hash,
            })
        });
    
        if (!response.ok) {
          alert("Failed to add user:\n" + (await response.json()).error);
          return;
        } else {
          alert("Added user. Please refresh")
        }
      })
    })
  }
  
  const login = () => {
    const name: string = (document.getElementById("name") as HTMLInputElement).value
    const pw: string = (document.getElementById("pw") as HTMLInputElement).value

    if (userExists(name)) {
      const hash = getHash(name)
      bcrypt.compare(pw, hash, async function(err, res) {
        if (res) {
          alert("Hashes match, user should be logged in")

          const response = await fetch("/api/auth/login", {
            method: "POST",
            body: JSON.stringify({
              username: name,
            })
          });

          const success = (await response.json()).success
          console.log(success)

        } else {
          alert("Hashes do not match. Do not log in user")
        }
      });
    } else {
      alert("User does not exist")
    }
  }

  const logout = async () => {
    await fetch("/api/auth/logout", {
      method: "GET"
    })
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
