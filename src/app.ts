import express from "express"
import cors from "cors"
import { router } from "./app/Routes"
import { notFound } from "./app/middleware/notRoute"
import { globalErrorHandler } from "./app/middleware/GlobalErrorHandler"



const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/v1',router)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(globalErrorHandler)
app.use(notFound)
export default app