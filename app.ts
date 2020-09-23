require("dotenv").config()
import express from "express"
import cors from "cors"

const app = express()
const PORT = process.env.EXP_PORT || 3000

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.get("/", (req, res) => res.send("Express + TypeScript Server"))

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`)
})
