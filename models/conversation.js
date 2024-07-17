const mongoose = require('mongoose')

const coversationSchema = new mongoose.Schema ({
  seller: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User'
  },
  buyer: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User'
  },
  textbook: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Textbook'
  },
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Message'
    }
  ]
})

const Conversation = mongoose.model('Conversation', coversationSchema)

module.exports = Conversation