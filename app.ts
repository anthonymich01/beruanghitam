require("dotenv").config()
import express, { NextFunction, Response } from "express"
import cors from "cors"
import morgan from "morgan"
import fileUpload from "express-fileupload"
import jwt from "jsonwebtoken"

// Import Routes
import user from "./src/routes/user"
import login from "./src/routes/login"
import register from "./src/routes/register"
import post from "./src/routes/post"
import watchlist from "./src/routes/watchlist"

const app = express()
const PORT = process.env.EXP_PORT || 3000

// Middleware
app.use(cors())
app.use(morgan("tiny"))
app.use(express.json())
app.use(fileUpload({ useTempFiles: true, tempFileDir: "/tmp/" }))

// Auth Middleware
function authToken(req: any, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"]
  const token = (authHeader && authHeader.split(" ")[1]) || ""
  if (token === null) return res.status(401).json({ error: "Not Logged In." })

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!)
    if (decoded) {
      req.userId = decoded.id
      next()
    }
  } catch (error) {
    res.status(401).json({ error })
  }
}

// ROUTES -----------

// Admin
// - Create Post
app.post("/v1/post", authToken, post.create)

// General
app.get("/v1/user", authToken, user.detail)

// Register
app.post("/v1/register", register)

// Login
app.post("/v1/login", login)

// Watchlist
app.get("/v1/watchlist", authToken, watchlist.get)
app.post("/v1/watchlist", authToken, watchlist.update)

// Indonesia Stock Database
app.get("/v1/watchlist/stock", watchlist.getStockList)

// END ROUTES -------

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`)
})
