import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()

import express from 'express'
import apiRoutes from './routes/index.js'
import { createClientAndConnect } from './db.js'

const app = express()
app.use(cors())
app.use('/api', apiRoutes)
const port = Number(process.env.SERVER_PORT) || 3001

createClientAndConnect()

app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`)
})
