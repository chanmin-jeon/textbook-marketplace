import { useState, useEffect } from 'react'
import conversationService from '../services/conversation'

const ChatView = ({ conversation, onBack, user }) => {
  const [messages, setMessages] = useState([])

  const [messageToSend, setMessageToSend] = useState('')

  useEffect(() => {
    const fetchConvoMessages = async () => {
      try {
        const convoMessages = await conversationService.getConversationMessages(conversation._id)
        setMessages(convoMessages)
      } catch (error) {
        console.error('Error fetching conversation messages:', error)
      }
    }
    fetchConvoMessages()
  }, [conversation]) // fetch everytime conversation changes 

  const handleSendMessage = async (event) => {
    event.preventDefault()
    const messageInfo = {
      senderId: user.id, 
      content: messageToSend
    }
    try {
      const sentMessage = await conversationService.sendMessage(conversation._id, messageInfo)
      // update frontend immediatly, backend takes a while
      const messageWithUpdatedSender = {
        ...sentMessage, 
        from: user
      }
      setMessages(messages => [...messages, messageWithUpdatedSender])
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
            {conversation.seller._id === user.id ? 
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
          console.log({
            message: message.content,
            from: message.from, 
            to: message.to, 
            currentUser: user.id
          })
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

