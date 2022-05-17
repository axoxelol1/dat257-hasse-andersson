import { Icon } from "@iconify/react";
import { useEffect, useState } from "react"
import { AuthService, UserService } from "../../lib/admin.service"
import { User } from "../../lib/types";

/*
  Page only accessible by admin user where they can send requests to add new users as well as delete them.
*/
export default function AddUser() {

  const [formValid, setFormValid] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [msg, setMsg] = useState("")
  const [users, setUsers] = useState<User[]>([])

  async function addUser() {
    const response = await new UserService().addUser(username, password)
    setUsername("")
    setPassword("")
    updateUserList()
    setMsg(await response)
  }
  
  useEffect(() => {
    setFormValid( !!username && !!password )
  }, [username, password])

  useEffect(() => {
    updateUserList()
  }, [])

  async function updateUserList() {
    setUsers(await new UserService().getUsers())
  }

  async function deleteUser(username: string) {
    if (confirm("Are you sure you want to delete this user?")) {
      await new UserService().deleteUser(username)
      updateUserList()
      setMsg(username + " deleted successfully")
    }
  } 

  return (
    <div className="flex flex-col items-center w-auto h-screen">
      <div className="w-3/4 md:w-1/6 flex flex-col items-center gap-4 py-12 min-w-min">
        <input id="username" className="h-8 rounded w-full pl-2" type="text" placeholder="Username" onChange={e => setUsername(e.target.value)} value={username}/>
        <input id="password" className="h-8 rounded w-full pl-2" type="text" placeholder="Password" onChange={e => setPassword(e.target.value)} value={password}/>
        <div className={`text-center text-red-700 ${ msg.includes("Error") ? "" : "text-green-600"}`}>{msg}</div>
        {formValid ?
          <button className="p-2 px-3 rounded text-white bg-green-600 hover:bg-green-500 transition-colors" onClick={addUser}>Add user</button>
          :
          <button className="p-2 px-3 rounded text-white bg-slate-400 transition-colors" disabled>Add user</button>
        }
      </div>
      <div className="flex flex-col w-3/4 md:w-1/6 min-w-min">
        {users.sort( (a,b) => a.username.toLowerCase() > b.username.toLowerCase() ? 1 : -1 ).map(u => (
          <div key={u.username} className="bg-white p-3 my-2 rounded flex flex-row justify-between">
            <span>{u.username}</span>
            { u.username !== "admin" && (
              <button onClick={() => deleteUser(u.username)} className="hover:bg-red-500 transition-colors rounded p-1">
                <Icon icon="octicon:trash-16" width="20" height="20" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}