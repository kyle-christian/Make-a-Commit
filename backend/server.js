require('dotenv').config({ path: "./config/.env"})

const express = require('express')
const mongoose = require('mongoose')
const connectDB = require('./config/database')
const treeRoutes = require('./routes/trees')

// express app
const app = express()

//connect to DB
connectDB()

//middleware
app.use(express.json())

app.use( (req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//routes
app.use('/api/trees', treeRoutes)

app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`)
})