import jwt, { JwtPayload } from "jsonwebtoken"
import { NextApiRequest } from "next"

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