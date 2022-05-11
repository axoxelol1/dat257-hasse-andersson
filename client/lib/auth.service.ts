import bcrypt from "bcryptjs"
import { User } from "./types"

export class AuthService {

  private async userExists(username: string): Promise<boolean> {
    console.log("ASSÅ HALLÅÅÅÅ")
    console.log(!!this.getUser(username) + " hejhej")
    return !!this.getUser(username)
  }

  private async getUser(username: string): Promise<User> {
    const response = await fetch("/api/auth/getUser", {
      method: "POST",
      body: JSON.stringify({
        username: username
      })
    })
    if (!response.ok) return null
    else return (await response.json()).user
  }

  async createUser(username: string, password: string) {

    if (await this.userExists(username)) {
      throw new Error("User already exists")
    }

    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(password, salt, async function(err, hash) {
        const response = await fetch("/api/auth/addUser", {
          method: "POST",
          body: JSON.stringify({
            username: username,
            salthash: hash,
          })
        })
    
        if (!response.ok) {
          throw new Error("Failed to add user")
        } 
      })
    })
  }

  async login(username: string, password: string) {

    this.userExists(username)

    if (!(this.userExists(username))) {
      throw new Error("User does not exists")
    } else {
      const hash = (await this.getUser(username)).salthash
      bcrypt.compare(password, hash, async function(err, res) {
        if (res) {
          const response = await fetch("/api/auth/login", {
            method: "POST",
            body: JSON.stringify({
              username: username,
            })
          })
  
          if (!response.ok) {
            throw new Error("Login failed")
          }
        } else {
          throw new Error("Passwords do not match")
        }
      })
    }
  }

  async logout() {
    await fetch("/api/auth/logout", {
      method: "GET"
    })
  }

  async verify(): Promise<string> {
    const response = await fetch("/api/auth/verify", {
      method: "GET"
    })

    return (await response.json()).username
  }
}