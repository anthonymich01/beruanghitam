import { Request, Response } from "express"
import jwt from "jsonwebtoken"
import { jwtExpires, jwtData } from "../constant/jwt"
import User from "../model/User"

type requestBody = {
  email: string
  password: string
}

const login = async (req: Request, res: Response) => {
  try {
    const { email, password }: requestBody = req.body
    const UserModel: User = new User()
    const jwtSecret: string = process.env.JWT_SECRET!

    const trimmedEmail: string = email.trim()
    const attempToLogin = await UserModel.loginUserByEmailPassword(trimmedEmail, password)

    if (attempToLogin.status) {
      const data: jwtData = { id: attempToLogin.userId! }
      const accessToken: string = jwt.sign(data, jwtSecret, { expiresIn: jwtExpires })
      res.json({ access_token: accessToken })
    } else {
      res.status(500).json({ error: attempToLogin.message })
    }
  } catch (error) {
    res.status(500).json({ error })
  }
}

export default login
