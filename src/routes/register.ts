import { Request, Response } from "express"
import jwt from "jsonwebtoken"
import { jwtExpires, jwtData } from "../constant/jwt"
import User from "../model/User"

type requestBody = {
  full_name: string
  email: string
  password: string
}

const register = async (req: Request, res: Response) => {
  try {
    const { full_name, email, password }: requestBody = req.body
    const UserModel: User = new User()
    const jwtSecret: string = process.env.JWT_SECRET!

    const isUserCreated = await UserModel.createUserByEmailPassword(full_name, email, password)

    if (isUserCreated.status) {
      const attempToLogin = await UserModel.loginUserByEmailPassword(email, password)
      if (attempToLogin.status) {
        const data: jwtData = { id: attempToLogin.userId! }
        const accessToken: string = jwt.sign(data, jwtSecret, { expiresIn: jwtExpires })
        res.json({ access_token: accessToken })
      } else {
        res.status(500).json({ error: attempToLogin.message })
      }
    } else {
      res.status(500).json({ error: isUserCreated.message })
    }
  } catch (error) {
    res.status(500).json({ error })
  }
}

export default register
