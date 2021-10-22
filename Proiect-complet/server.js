require('dotenv').config()

const express = require("express")
const app = express()
const mongoose = require('mongoose')

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
    next();
})
mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to database'))


app.use(express.json())

const employerRouter = require('./routes/employees')
const projectRouter = require('./routes/projects')
const userRouter = require('./routes/users')
app.use('/employees', employerRouter)
app.use('/projects', projectRouter)
app.use('/user', userRouter)
app.listen(3000, () => console.log('Server Started'))