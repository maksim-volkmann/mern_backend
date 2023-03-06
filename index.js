import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import userRoute from './routes/user.route.js'
import recipeRoute from './routes/recipe.route.js'
import registerRoute from './routes/auth.route.js'

const app = express()
const port = 5000

dotenv.config()

app.use(cookieParser())
app.use(express.json())
app.use(cors({ origin: process.env.FRONT_END_SERVER_URL, credentials: true }))

const connectionToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL)
    console.log('Connection to mongoDB is successfull!')
  } catch (error) {
    console.error(error)
  }
}

app.use('/api', userRoute)
app.use('/api', registerRoute)
app.use('/recipe', recipeRoute)
app.use('*', (req, res) => {
  res.status(404).json({ error: 'path not faund' })
})

app.listen(port, () => {
  connectionToMongoDB()
  console.log(`Server running on ${port}!`)
})
