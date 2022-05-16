import { useEffect, useState } from "react"
import { AuthService } from "../../lib/auth.service"

/*
  Page only accessible by admin user where they can send rquests to add new users.
*/
export default function addUser() {

  const [formValid, setFormValid] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [msg, setMsg] = useState("")

  async function addUser() {
    const response = await new AuthService().addUser(username, password)
    setMsg(await response)
    setUsername("")
    setPassword("")
  }
  
  useEffect(() => {
    setFormValid( !!username && !!password )
  }, [username, password])

  return (
    <div className="flex flex-col items-center w-auto h-screen">
      <div className="w-1/6 flex flex-col items-center gap-4 py-12">
        <input id="username" className="h-8 rounded w-full pl-2" type="text" placeholder="Username" onChange={e => setUsername(e.target.value)} value={username}/>
        <input id="password" className="h-8 rounded w-full pl-2" type="text" placeholder="Password" onChange={e => setPassword(e.target.value)} value={password}/>
        <div className={`h-6 text-center text-red-700 ${ msg.includes("Error") ? "" : "text-green-600"}`}>{msg}</div>
        {formValid ?
          <button className="h-8 w-1/3 rounded text-white bg-green-600 hover:bg-green-500 transition-colors" onClick={addUser}>Add user</button>
          :
          <button className="h-8 w-1/3 rounded text-white bg-slate-400 transition-colors" disabled>Add user</button>
        }
      </div>
    </div>
  )
}