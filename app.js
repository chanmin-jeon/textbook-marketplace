// import what is necessary
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
//require('express-async-errors')
const config = require('./utils/config')
const usersRouter = require('./controllers/users')
const textbooksRouter = require('./controllers/textbooks')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')
const conversationsRouter = require('./controllers/conversations')

// connect to mongodb

mongoose.connect(config.URL)
  .then(() => {
    console.log(`connected to ${config.URL}`)
  })
  .catch((error) => {
    console.log('error connecting to mongo db')
    console.log(error.message)
  });

app.use(cors())
app.use(express.json({ limit: '15mb' }))
app.use(middleware.requestLog)

app.use('/api/users', usersRouter)
app.use('/api/textbooks', textbooksRouter)
app.use('/api/login', loginRouter)
app.use('/api/conversations', conversationsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app