import bcrypt from "bcryptjs"
import { DatabaseService } from "./db.service"

export class AuthService {

  private async userExists(username: string): Promise<boolean> {
    const db = new DatabaseService()
    return !!(await db.getUser(username))
  }

  async createUser(username: string, password: string) {

    if (await this.userExists(username)) {
      //TODO throw error here that username doesnt exist
      return
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
          alert("Failed to add user:\n" + (await response.json()).error)
          return
        } else {
          alert("Added user. Please refresh")
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
          //Throw error user login failed in api
          return
        } else {
          //User logged in successfully.
        }
      } else {
        throw new Error("Passwords do not match")
      }
    })
  }
}