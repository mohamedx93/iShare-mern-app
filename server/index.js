import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import postRoutes from './routes/postsRoutes.js'
import userRoutes from './routes/usersRoutes.js'

const app = express()
dotenv.config()

app.use(express.json({ limit: '30mb', extended: true }))
app.use(express.urlencoded({ limit: '30mb', extended: true }))
app.use(cors())
app.use('/posts', postRoutes)
app.use('/user', userRoutes)
app.get('/', (req, res) => {
  res.send('App is running')
})



// const CONNECTION_URL = `mongodb+svg://${encodeURIComponent(process.env.DB_USER)}:${encodeURIComponent(process.env.DB_PWD)}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`
const CONNECTION_URL = process.env.CONNECTION_URL;

const PORT = process.env.PORT || 5000;
mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(res => {
    console.log('db connected')
    app.listen(PORT, () => console.log('server running on:\t', PORT))
    mongoose.set('useFindAndModify', false)
  })
  .catch(err => console.log(err.message))
