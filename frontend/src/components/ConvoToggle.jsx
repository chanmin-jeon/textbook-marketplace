import messageIcon from '../assets/message.svg'

const ConvoToggle = ({chatVisible, setChatVisible}) => {
  
  return (
    <div>
      {!chatVisible ? (
        <div className='message-icon-container' onClick={() => setChatVisible(true)}>
          <img src={messageIcon} alt="message icon" className='message-icon'/>
        </div>
      ) : (
        <div className='messages-display-container'>
          <div className='messages-title-container' >
            <h3 >My messages</h3>
            <p onClick={() => setChatVisible(false)}> close</p>
          </div>
          <div className='chat-container'>
            my chats
          </div>
        </div>
      )}
    </div>
  )
}

export default ConvoToggle