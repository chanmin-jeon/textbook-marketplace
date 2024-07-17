const ChatDisplay = ({conversations, onSelectConversation}) => {

  return (
    <div className="all-chats-container">
      {conversations.map(conversation => {
        return (
          <div className="chat-container" key={conversation._id} onClick={() => onSelectConversation(conversation)}>
            {(!conversation.textbook) ? 
            <p style={{ fontStyle: 'italic' }}>
              This item has been deleted
            </p>
            :  
            <p>
              {conversation.textbook.title}
            </p>
            }
          </div>
        )
      })}
    </div>
  )
}

export default ChatDisplay