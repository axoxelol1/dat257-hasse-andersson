import { useState } from "react"
import { AuthService } from "../lib/auth.service"

/*
  Simple page to show that users can be verified as logged in
*/
export default function JWTTest() {

  const [loggedInUser, setLoggedInUser] = useState("Click me to verify user!")

  const verifyUser = async () => {

    const auth = new AuthService()
    const username = await auth.verify()
    console.log(username)
    
    if (username) {
      setLoggedInUser(username)
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