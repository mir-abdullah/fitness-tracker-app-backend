import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRouter from './routes/user.js'
import workoutRouter from './routes/workout.js'


dotenv.config();

const app = express();
app.use(express.json())
app.use('/users',userRouter)
app.use('/workouts',workoutRouter)
const PORT = process.env.PORT || 3000
const db_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017/'


app.use('/',(req,res)=>{
    res.send('Hello World')
})

//connecting to db
mongoose.connect(db_URL).then(()=>{
    console.log('connected to db')
    app.listen(PORT,()=>{
        console.log(`server is running on port ${PORT}`)
    })
}).catch((error)=>{
    console.log(error)
})


