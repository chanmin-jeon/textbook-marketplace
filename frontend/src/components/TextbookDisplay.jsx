import conversationService from '../services/conversation'
import { useNavigate } from 'react-router-dom'

const TextbookDisplay = ({user, textbook, handleDelete, setChatVisible, conversations, setConversations}) => {

  const navigate = useNavigate()

  const deleteHandle = async (id) => {
    window.confirm('Are you sure you want to delete this listing?', () => {
      handleDelete(id)
    })
  }

  const createConvo = async (userId, sellerId, textbookId) => {
    let convoInfo = {
      buyerId: userId, 
      sellerId: sellerId, 
      textbookId: textbookId
    }
    console.log('trying to create convo')
    try {
      const newConvo = await conversationService.createNew(convoInfo)
      console.log(newConvo)
      if (newConvo.message === 'conversation exists') {
        window.alert('You have already contacted this seller')
      } else {
        // get updated user conversations
        const updatedConversations = await conversationService.getAllUserConvo(user.id)
        setConversations(updatedConversations)
        setChatVisible(true)
      }
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <article className="textbook-article">
      <div className="article-img-container">
        <img src={textbook.imageFile} alt="text book image" />
      </div>
      <div className="article-info-container">
        <div>
          <h3>
            {textbook.title.charAt(0).toUpperCase() + textbook.title.slice(1)}
          </h3>
        </div>
        <div>
          <p>by: {textbook.authors.join(', ')}</p>
        </div>
        <div>
          <p>subject: {textbook.category}</p>
        </div>
        <div>
          <p>$ {textbook.price}</p>
        </div>
      </div>
      {user && user.id === textbook.seller.id ?
      <div className="message-seller-btn-container delete-item-btn-container">
        <button className="delete-item-btn" onClick={() => deleteHandle(textbook.id)}>Delete Listing</button>
      </div>
      :
      <div className="message-seller-btn-container">
        <button onClick={() => {
          if (!user) {
            navigate('/login')
          } else {
            createConvo(user.id, textbook.seller.id, textbook.id)
          }
          }}className="message-seller-btn">Message Seller</button>
      </div>
      }
    </article>
  )
}

export default TextbookDisplay