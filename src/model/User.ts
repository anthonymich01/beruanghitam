import bcrypt from "bcrypt"
import { saltRounds } from "../constant/bcrypt"
import db from "../db"
import { insertNewUserByEmailPassword, getUserByEmail, getUserIdById, insertNewDefaultWatchlistByUserId } from "../db/query"

type isUserCreated = {
  status: boolean
  message: string
}

type isUserLoggedIn = {
  status: boolean
  message: string
  userId?: number
}

type userDetail = {
  id: number
  full_name: string
  email: string
  role: number
} | null

class User {
  getUserDetailById = async (id: number): Promise<userDetail> => {
    try {
      const res = await db.query(getUserIdById, [id])
      if (res.rows[0]) {
        const userDetail: any = res.rows[0]
        return {
          id: userDetail.id,
          full_name: userDetail.full_name,
          email: userDetail.email,
          role: userDetail.role
        }
      }
      return null
    } catch (error) {
      console.log(error)
      return null
    }
  }

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

  createUserByEmailPassword = async (full_name: string, email: string, password: string): Promise<isUserCreated> => {
    const checkUserEmail: boolean = await this.isEmailDuplicated(email)
    if (checkUserEmail) return { status: false, message: "Email already taken." }

    const trimmedFullName: string = full_name.trim()
    const trimmedEmail: string = email.trim()
    const hashedPassword: string = await bcrypt.hash(password, saltRounds)

    try {
      const res = await db.query(insertNewUserByEmailPassword, [trimmedFullName, trimmedEmail, hashedPassword])
      const newUserId = res.rows[0]["id"]
      await db.query(insertNewDefaultWatchlistByUserId, [newUserId])

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
        if (checkPassword) return { status: true, message: "", userId: +userData.id }
      }
      return { status: false, message: "Email / Password anda salah." }
    } catch (error) {
      console.log(error)
      return { status: false, message: error }
    }
  }
}

export default User
