import '../services/textbooks'
import TextbookDisplay from '../components/TextbookDisplay.jsx'

const MyListings = ({user, textbooks, handleDelete}) => {
  if (!user) {
    return (
    <p>error occured, re-login</p>
    )
  }
  return (
    <div className="main-container">
      <div className='textbooks-container'>
        {textbooks.map(textbook => {
          if (textbook.seller.id === user.id) {
            return (
              <TextbookDisplay key={textbook.id} user={user} textbook={textbook} handleDelete={handleDelete}/>
            )
          }
        })}
      </div>
    </div>
  )
}

export default MyListings