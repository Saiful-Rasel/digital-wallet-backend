import express from "express"
import cors from "cors"
import { router } from "./app/Routes"
import { notFound } from "./app/middleware/notRoute"
import { globalErrorHandler } from "./app/middleware/GlobalErrorHandler"
import cookieParser from "cookie-parser";


const app = express()
app.use(cookieParser())
app.use(cors({
  origin:"http://localhost:3000",
  credentials:true
}))
app.use(express.json())

app.use('/api/v1',router)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(globalErrorHandler)
app.use(notFound)
export default app