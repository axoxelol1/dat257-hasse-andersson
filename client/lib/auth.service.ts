import bcrypt from "bcryptjs"
import { DatabaseService } from "./db.service"

export class AuthService {

  private async userExists(username: string): Promise<boolean> {
    const db = new DatabaseService()
    return !!(await db.getUser(username))
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

    if (!(await this.userExists(username))) {
      throw new Error("User does not exists")
    }

    const db = new DatabaseService()

    const hash = (await db.getUser(username)).salthash
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