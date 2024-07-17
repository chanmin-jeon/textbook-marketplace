// import what is needed
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
require('express-async-errors')
const config = require('./utils/config')
const usersRouter = require('./controllers/users')
const textbooksRouter = require('./controllers/textbooks')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')

mongoose.connect(config.URL)
    .then(()=> {
        console.log(`connected to ${config.URL}`)
    })
    .catch((error)=> {
        console.log('error connecting to mongo db')
        console.log(error.message)
    })

app.use(cors())
app.use(express.json()) // needed to read request body
app.use(middleware.requestLog)

app.use('/api/users', usersRouter)
app.use('/api/textbooks', textbooksRouter)
app.use('/api/login', loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

app.get('/', (req, res) => {
    res.send('<p>new file structure</p>')
})

module.exports = app