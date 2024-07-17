const http = require('http')
const app = require('./app')
const config = require('./utils/config')
const socketIo = require('socket.io')

const server = http.createServer(app) // create http server with app 

const allowedOrigins = process.env.NODE_ENV === 'test' 
    ? ['http://localhost:5174', 'http://localhost:8000'] // test origin
    : 'https://textbook-marketplace.onrender.com' // production origin


// Initialize Socket.IO
const io = socketIo(server, {
    cors: {
        origin: allowedOrigins,
        credentials: true
    }, 
    pingTimeout: 60000
})

// Handle Socket.IO connections
io.on('connection', (socket) => {
  console.log(`a user connected ${socket.id}`)

  // handle joining coversation
  socket.on('join-conversation', (conversationId) => {
    console.log(`a user connect to conversation ${conversationId}`)
    socket.join(conversationId)
  })

  socket.on('send-message', (message) => {
    console.log(`the message ${message} was sent`)
    io.to(message.conversationId).emit('receive-message', message)
  })

  socket.on('disconnect', () => {
    console.log(`user disconnected ${socket.id}`)
  })
})

// Start the server
server.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}`)
})