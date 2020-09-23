require("dotenv").config()
import express from "express"
import cors from "cors"
import morgan from "morgan"

// Import Routes
import user from "./src/routes/user"
import login from "./src/routes/login"
import register from "./src/routes/register"

const app = express()
const PORT = process.env.EXP_PORT || 3000

// Middleware
app.use(cors())
app.use(morgan("tiny"))
app.use(express.json())

// ROUTES -----------

// General
app.get("/", user.list)

// Register
app.post("/register", register)

// Login
app.post("/login", login)

// END ROUTES -------

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`)
})
