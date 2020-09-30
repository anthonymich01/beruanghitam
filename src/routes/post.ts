import User from "../model/User"
import { userRole } from "../constant/userRole"
import { v4 as uuidv4 } from "uuid"
import gcs from "../util/cloudStorage"

const create = async (req: any, res: any) => {
  try {
    const { userId } = req
    const { image } = req.files

    const UserModel: User = new User()
    const userDetail = await UserModel.getUserDetailById(userId)

    if (userRole[userDetail!.role] === "ADMIN" || userRole[userDetail!.role] === "SUPERADMIN") {
      const bucket = gcs.bucket("lamberindo-club")

      const imageExtension = image.name.split(".").pop()
      const uploadImageOptions = { destination: `images/${uuidv4()}.${imageExtension}`, validation: "crc32c" }
      await bucket.upload(image.tempFilePath, uploadImageOptions)

      res.json({ ...userDetail })
    } else throw new Error("Forbidden!")
  } catch (error) {
    res.status(401).json({ error: error.message })
  }
}

export default { create }
