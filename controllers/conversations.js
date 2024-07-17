const Textbook = require('../models/textbook')
const User = require('../models/user')
const Message = require('../models/message')
const Conversation = require('../models/conversation')

const conversationsRouter = require('express').Router()

// create new or find conversation 
conversationsRouter.post('/', async (req, res) => {
  const { buyerId, sellerId, textbookId } = req.body 

  try {
    // check if conversation exists
    let conversation = await Conversation.findOne({
      buyer: buyerId,
      seller: sellerId, 
      textbook: textbookId
    })

    if (conversation) {
      return res.status(200).json({message: 'conversation exists', 
        conversation})
    }

    const seller = await User.findById(sellerId)
    const buyer = await User.findById(buyerId)
    const textbook = await Textbook.findById(textbookId)

    if (!(seller && buyer && textbook)) {
      return res.status(400).json({error: "invalid buyer, seller or textbook"})
    }
    
    conversation = new Conversation ({
      buyer: buyerId, 
      seller: sellerId, 
      textbook: textbookId, 
      messages: []
    })

    const savedConvo = await conversation.save()

    res.status(201).json(savedConvo)
  }  
  catch (error) {
    res.status(500).json({error: 'an error occurred trying to create a new conversation'})
  }
})

// get conversations of the current user 
conversationsRouter.get('/:userId', async (req, res) => {
  const userId = req.params.userId
  try {
    const user = await User.findById(userId)
    if (!user) {
      return res.status(400).json({error: 'user id invalid'})
    }
    const conversations = await Conversation.find({
      // find conversations where user is buyer or seller
      $or: [
        {buyer: user._id}, 
        {seller: user._id}
      ]
    }).populate('buyer seller textbook')
    res.json(conversations)

  } catch (error) {
    res.status(400).json({error: 'error fetching conversations'})
  }
})

// send message
conversationsRouter.post('/:convoId/messages', async (req, res) => {
  const convoId = req.params.convoId
  const { senderId, content } = req.body

  try {
    const conversation = await Conversation.findById(convoId)
    if (!conversation) {
      return res.status(404).json({ error: 'Conversation not found' })
    }

    const sender = await User.findById(senderId)
    if (!sender) {
      return res.status(400).json({ error: 'Invalid sender' })
    }

    const recipient = conversation.buyer.toString() === senderId ? conversation.seller : conversation.buyer

    const newMessage = new Message({
      from: senderId,
      to: recipient,
      content: content
    })

    const savedMessage = await newMessage.save()
    conversation.messages.push(savedMessage._id)
    await conversation.save()

    res.status(201).json(savedMessage)
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while sending the message' })
  }
})

// get messages for a specific conversation
conversationsRouter.get('/:convoId/messages', async (req, res) => {
  const convoId = req.params.convoId

  try {
    const conversation = await Conversation.findById(convoId).populate({
      path: 'messages',
      populate: {
        path: 'from to',
        select: 'username name'
      }
    })

    if (!conversation) {
      return res.status(404).json({ error: 'Conversation not found' })
    }

    res.json(conversation.messages)
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching messages' })
  }
})

module.exports = conversationsRouter