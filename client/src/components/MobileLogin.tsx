import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { AuthService } from "../../lib/admin.service";

const auth = new AuthService()

export default function MobileLogin () {
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

  const [errorMessage, setErrorMessage] = useState("");
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    auth.verify().then(setLoggedInUser)
  }, [loggedInUser])
  
  return (
    (loggedInUser ? (
      <div className="flex justify-center items-center h-full w-30">
        <div>
          Logged in as <span className="font-bold">{loggedInUser}</span>
        </div>
        <button onClick={logout} className="rounded-md px-2 py-1 border-2 border-black">
          Logout
        </button>
      </div>
    ) : (
      <div>
      <button onClick={() => setIsOpen(!isOpen)} type="button" className="flex justify-center items-center text-black hover:-translate-y-0.5 transition-transform px-3 text-xl font-medium">
        {isOpen ? (<Icon className="mr-2" icon="octicon:chevron-down-16" height={24} width={24}/>) : (<Icon className="mr-2" icon="octicon:chevron-right-16" height={24} width={24}/>)}
          Login
        </button>
        {isOpen && 
          <div className="flex mx-6 flex-col">
            <p>Username</p>
            <input type="text" id="name" className="border border-gray-300 p-2 rounded-md" />
            <p>Password</p>
            <input type="password" id="pw" className="border border-gray-300 p-2 rounded-md" />
            <p className="text-red-500 py-2 text-xs italic">{errorMessage}</p>
            <button type="button" onClick={login} className="my-2 py-2 flex justify-center items-center text-white bg-gray-900 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
              <span>Login</span>
            </button>
          </div>
          }
      </div>
    ))
  );
}