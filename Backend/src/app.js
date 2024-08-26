import express from "express"
import cookieParser from "cookie-parser";
import cors from 'cors'

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
app.use(cookieParser())
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))


import userRouter from "./routes/user.routes.js"
import noteRouter from "./routes/note.routes.js"

app.use("/user", userRouter)
app.use("/note", noteRouter)


//http://localhost:8000/user/register
export {app}