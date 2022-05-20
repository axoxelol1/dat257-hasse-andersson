import sha256 from "crypto-js/sha256"
import { NextApiRequest } from "next"
import jwt, { JwtPayload } from "jsonwebtoken"
import { User } from "./types"

/* 
  Hash username and password together using SHA256
  Not really necessary since HTTPS protects passwords in transport
  but the backend will then not know the users plain text password
  Username appended as a sort of salt
*/ 
function hashPassword(username: string, password: string): string {
  return sha256(password + username).toString()
}

export class AuthService {

  /**
   * Logs user in
   * @param username username
   * @param password password
   * @returns message of how to it went
   */
  async login(username: string, password: string): Promise<string> {

    if (!(username && password)) {
      return "Error: Fields empty"
    }

    const hash = hashPassword(username, password)

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: username,
        hashedPassword: hash,
      })
    })

    if (!response.ok) {
      return "Error: " + (await response.json()).error
    } else {
      return (await response.json()).message
    }
  }

  /**
   * Logs the user out by removing the authorization cookie
   */
  async logout() {
    await fetch("/api/auth/logout", {
      method: "GET"
    })
  }

  /**
   * Validates JWT in cookies against secret key
   * @returns username of logged in user if it exists
   */
  async verify(): Promise<string> {
    const response = await fetch("/api/auth/verify", {
      method: "GET"
    })

    return (await response.json()).username
  }
}

export class UserService {
  /**
   * Adds user to database
   * @param username username
   * @param password password
   * @returns message of how it went
   */
   async addUser(username: string, password: string): Promise<string> {

    if (!(username && password)) {
      return "Error: Fields empty"
    }

    const hash = hashPassword(username, password)
 
    const response = await fetch("/api/users/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: username,
        hashedPassword: hash,
      })
    })

    if (response.ok) {
      return (await response.json()).message
    } else {
      return "Error: " + (await response.json()).error
    }
  }

  /**
   * @returns all users in the database
   */
  async getUsers(): Promise<User[]> {
    const response = await fetch("api/users/get")
    
    if (response.ok) {
      return await response.json()
    } else {
      return []
    }
  }

  /**
   * Removes a user from the database
   * @param username username of user to be deleted
   */
  async deleteUser(username: string) {
    const response = await fetch("api/users/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: username
      })
    })

    if (response.ok) {
      return "User deleted successfully"
    } else {
      return "Error: " + (await response.json()).error
    }
  }
}

export class BackendAuthService {
  /**
   * Verifies the JWT inside the cookies of a request
   * @param req the request containing the cookie storing the JWT
   * @returns the username inside the JWT's payload
   */
  verifyToken(req: NextApiRequest): string {
    const { cookies } = req //Picks out the cookies from the request using object destructuring
    const token = cookies.JWT
  
    try {
      const payload = (jwt.verify(token, process.env.JWT_SECRET) as JwtPayload)
      return payload.username
    } catch {
      return null
    }
  }
}