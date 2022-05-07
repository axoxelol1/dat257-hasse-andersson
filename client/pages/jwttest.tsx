import { useState } from "react"

/*
  Simple page to show that users can be verified as logged in
*/
export default function JWTTest() {

  const [loggedInUser, setLoggedInUser] = useState("Click me to verify user!")

  const verifyUser = async () => {

    const response = await fetch("/api/auth/verify", {
      method: "GET"
    })
  
    const user = (await response.json()).username
    if (user) {
      setLoggedInUser(user)
    } else {
      setLoggedInUser("No user logged in or session expired")
    }

  } 

  return (
    <div onClick={verifyUser} className="cursor-pointer select-none">
      {loggedInUser}
    </div>
  )
}