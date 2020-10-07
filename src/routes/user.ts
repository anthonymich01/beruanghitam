import User from "../model/User"
type userDetail = {
  id: number
  full_name: string
  email: string
  role: number
} | null

const detail = async (req: any, res: any) => {
  try {
    const { userId } = req
    const UserModel: User = new User()
    const userDetail: userDetail = await UserModel.getUserDetailById(userId)
    res.json({ ...userDetail })
  } catch (error) {
    console.log(error)
    res.status(401).json({ error })
  }
}

export default { detail }
