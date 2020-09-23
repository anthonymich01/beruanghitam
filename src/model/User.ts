import bcrypt from "bcrypt"
import { saltRounds } from "../constant/bcrypt"
import db from "../db"
import { insertNewUserByEmailPassword, getUserByEmail } from "../db/query"

type isUserCreated = {
  status: boolean
  message: string
}

type isUserLoggedIn = {
  status: boolean
  message: string
  userId?: number
}

class User {
  isEmailDuplicated = async (email: string): Promise<boolean> => {
    try {
      const res = await db.query(getUserByEmail, [email])
      if (res.rows[0]) {
        return true
      }
      return false
    } catch (error) {
      console.log(error)
      return false
    }
  }

  createUserByEmailPassword = async (email: string, password: string): Promise<isUserCreated> => {
    const checkUserEmail: boolean = await this.isEmailDuplicated(email)
    if (checkUserEmail) {
      return { status: false, message: "Email already taken." }
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds)

    try {
      await db.query(insertNewUserByEmailPassword, [email, hashedPassword])
      return { status: true, message: "" }
    } catch (error) {
      console.log(error)
      return { status: false, message: error }
    }
  }

  loginUserByEmailPassword = async (email: string, password: string): Promise<isUserLoggedIn> => {
    try {
      const res = await db.query(getUserByEmail, [email])
      if (res.rows[0]) {
        const userData: any = res.rows[0]
        const checkPassword: boolean = await bcrypt.compare(password, userData.password)
        if (checkPassword) {
          return { status: true, message: "", userId: +userData.id }
        }
      }
      return { status: false, message: "Email / Password anda salah." }
    } catch (error) {
      console.log(error)
      return { status: false, message: error }
    }
  }
}

export default User
