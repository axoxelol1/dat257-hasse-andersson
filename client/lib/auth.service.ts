import sha256 from "crypto-js/sha256"

export class AuthService {

  /* 
    Hash username and password together using SHA256
    Not really necessary since HTTPS protects passwords in transport
    but the backend will then not know the users plain text password
    Username appended as a sort of salt
  */ 
  private hashPassword(username: string, password: string): string {
    return sha256(password + username).toString()
  }

  /**
   * Adds user to database
   * @param username username
   * @param password password
   * @returns message of how it went
   */
  async createUser(username: string, password: string): Promise<string> {

    const hash = this.hashPassword(username, password)
 
    const response = await fetch("/api/auth/addUser", {
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
   * Logs user in
   * @param username username
   * @param password password
   * @returns message of how to it went
   */
  async login(username: string, password: string): Promise<string> {

    const hash = this.hashPassword(username, password)

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