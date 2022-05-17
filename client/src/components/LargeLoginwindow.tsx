import { useEffect, useState } from "react"
import React from "react"
import { AuthService } from "../../lib/admin.service"
import { Icon } from "@iconify/react"
import Link from "next/link"

const auth = new AuthService()

export default function LargeLoginwindow() {


  const login = async () => {
    const name: string = (document.getElementById("name") as HTMLInputElement).value
    const pw: string = (document.getElementById("pw") as HTMLInputElement).value

    if (name === '' || pw === '') {
      setErrorMessage("Please fill in all fields");
      return;
    } else {
      setErrorMessage("");
    }

    await auth.login(name, pw)
    const user = await auth.verify()
    if (!user) {
      setErrorMessage("Wrong username or password");
    }
    setLoggedInUser(user)
  }

  const logout = async () => {
    await auth.logout();
    setLoggedInUser(null);
  }

  const [isOpen, setIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    (
      async () => {
        const username = await auth.verify()
        setLoggedInUser(username)
        setIsAdmin(username === "admin")
      }
    )()
  }, [loggedInUser])
  

  return (
    <div className="flex h-full">
      <button onClick={() => setIsOpen(!isOpen)} className={`flex justify-center items-center h-full w-30 transition ${isOpen ? "opacity-20" : ""}`}>
        <Icon className="mr-2" icon="octicon:person-16" width={24} height={24} />
        <span className="font-medium text-xl">Login</span>
      </button>
      {isOpen && (
        <div className="absolute right-4 top-20 w-64 bg-gray-200/95 rounded p-4 flex flex-col gap-3 z-50">
          {loggedInUser ? (
            <>
              <div>
                Logged in as <span className="font-bold">{loggedInUser}</span>
              </div>
              <div className="flex flex-row justify-around w-full gap-4">
                <button onClick={logout} className=" rounded-md px-2 py-1 border-2 border-black grow">
                  Logout
                </button>
                { isAdmin && (
                  <Link href="/users">
                    <a className="rounded-md px-2 py-1 border-2 border-black">
                      Manage users
                    </a>
                  </Link>
                )}
              </div>
            </>
          ) : (
            <>
              <div className="">
                <p> Username: </p>
                <input className="rounded-md" id="name" type={"email"}></input>
              </div>

              <div className="">
                <p>Password: </p>
                <input className="rounded-md w-auto" id="pw" type={"password"}></input>
              </div>
              <div className="text-red-500 text-xs italic">
                {errorMessage}
              </div>
              <button onClick={login} className="rounded-md px-2 py-1 border-2 border-black">
                Login
              </button>
            </>
          )}

        </div>
      )}
    </div>
  )
}
