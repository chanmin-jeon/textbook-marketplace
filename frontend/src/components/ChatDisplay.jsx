const ChatDisplay = ({conversations, onSelectConversation}) => {
  console.log(conversations)

  return (
    <div className="all-chats-container">
      {conversations.map(conversation => {
        return (
          <div className="chat-container" key={conversation._id} onClick={() => onSelectConversation(conversation)}>
            <p>{conversation.textbook.title}</p>
          </div>
        )
      })}
    </div>
  )
}

export default ChatDisplay