import { useState, useEffect } from 'react'
import conversationService from '../services/conversation'
import { io } from 'socket.io-client'

const socket = io.connect('https://textbook-marketplace.onrender.com') // set up front end socket connection

const ChatView = ({ conversation, onBack, user }) => {
  const [messages, setMessages] = useState([])

  const [messageToSend, setMessageToSend] = useState('')

  useEffect(() => {
    const fetchConvoMessages = async () => {
      // fetch messages from backend 
      try {
        const convoMessages = await conversationService.getConversationMessages(conversation._id);
        setMessages((prevMessages) => {
        // Merge the fetched messages with the current state, avoiding duplicates
        const newMessages = convoMessages.filter(
          // if message does not exist, include in newMessages
          (convoMessage) => !prevMessages.some((m) => m._id === convoMessage._id)
        )
        return [...prevMessages, ...newMessages] // merge them
      })
      } catch (error) {
        console.error('Error fetching conversation messages:', error)
      }
    }
    fetchConvoMessages()

    // join conversation
    socket.emit('join-conversation', conversation._id)

    socket.on('receive-message', (message) => {
      setMessages((prevMessages) => {
        // Only add the message if it doesn't already exist in the state
        if (!prevMessages.some((m) => m._id === message._id)) {
          return [...prevMessages, message]
        }
        return prevMessages
      })
    })

    return () => {
      socket.off('receive-message')
    }

  }, [conversation]) // fetch everytime conversation changes 

  const handleSendMessage = async (event) => {
    event.preventDefault()
    const messageInfo = {
      senderId: user.id, 
      content: messageToSend, 
      conversationId: conversation._id
    }
    try {
      const sentMessage = await conversationService.sendMessage(conversation._id, messageInfo)
      // update frontend immediatly, backend takes a while
      const messageWithUpdatedSender = {
        ...sentMessage, 
        from: user, 
        conversationId: conversation._id
      }
      setMessages(messages => [...messages, messageWithUpdatedSender])
      socket.emit('send-message', messageWithUpdatedSender)
    } catch (error) {
      console.log(error)
    }
    setMessageToSend('')
  }

  return (
    <div className="chat-view">
      <div className="chat-header">
        <div>
          <p onClick={onBack}>back</p>
        </div>
        <div className='title-recipient-container'>
          <h3>{conversation.textbook.title}</h3>
          <div className='message-recipient'>
            {conversation.seller.id === user.id ? 
            <p>
              {conversation.buyer.username}
            </p>
            :
            <p>
              {conversation.seller.username}
            </p>  
          }
          </div>
        </div>
      </div>
      <div className="chat-messages">
        {messages.map((message) => {
          const messageFromCurrentUser = message.from.id === user.id
          return (
            <div
              key={message._id}
              className={`message ${messageFromCurrentUser ? "right" : "left"}`}
            >
              <p>{message.content}</p>
              <span className="timestamp">
                {new Date(message.timeStamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          )
        })}
      </div>
      <form onSubmit={handleSendMessage}>
        <input type="text" onChange={event => setMessageToSend(event.target.value)} value={messageToSend}/>
        <button type='submit'>Send</button>
      </form>
    </div>
  )
}

export default ChatView

