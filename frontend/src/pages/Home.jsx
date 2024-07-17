import TextbookDisplay from '../components/TextBookDisplay'

const Home = ({user, textbooks, handleDelete, conversations, setConversations}) => {
  return (
    <>
      <div className="main-container">
        {textbooks.map(textbook => {
          return (
            <TextbookDisplay user={user} key={textbook.id} 
            textbook={textbook} handleDelete={handleDelete} 
            conversations={conversations} setConversations={setConversations}/>
          )
        })}
      </div>
    </>
  )
}

export default Home