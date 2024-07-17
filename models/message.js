const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema ({
  from: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User'
  },
  to: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User'
  }, 
  content: {
    type: String, 
    required: true
  }, 
  timeStamp: {
    type: Date, 
    default: Date.now
  }
})

const Message = mongoose.model('Message', messageSchema)

module.exports = Message