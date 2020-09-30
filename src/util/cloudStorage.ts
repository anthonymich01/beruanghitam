import path from "path"
import { Storage } from "@google-cloud/storage"

const gcs = new Storage({
  keyFilename: path.join(__dirname, "../../metal-imprint-285008-c1e8f291846b.json"),
  projectId: "metal-imprint-285008"
})

export default gcs
