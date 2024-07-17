import React, { useState } from 'react';
import messageIcon from '../assets/message.svg';
import ChatDisplay from './ChatDisplay';
import ChatView from './ChatView';

const ConvoToggle = ({ chatVisible, setChatVisible, conversations, user }) => {
  const [selectedConversation, setSelectedConversation] = useState(null)

  return (
    <div>
      {!chatVisible ? (
        <div className='message-icon-container' onClick={() => setChatVisible(true)}>
          <img src={messageIcon} alt="message icon" className='message-icon'/>
        </div>
      ) : (
        <div className='messages-container'>
          {selectedConversation ? (
            <ChatView 
              conversation={selectedConversation} 
              onBack={() => setSelectedConversation(null)}
              user={user}
            />
          ) : (
            <>
              <div className='messages-title-container'>
                <h3>Messages</h3>
                <p onClick={() => setChatVisible(false)}>Close</p>
              </div>
              <ChatDisplay 
                conversations={conversations}
                onSelectConversation={setSelectedConversation}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ConvoToggle