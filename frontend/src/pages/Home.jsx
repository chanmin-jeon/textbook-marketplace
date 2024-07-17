import TextbookDisplay from '../components/TextBookDisplay'

const Home = ({user, textbooks, handleDelete}) => {
  return (
    <>
      <div className="main-container">
        {textbooks.map(textbook => {
          return (
            <TextbookDisplay user={user} key={textbook.id} textbook={textbook} handleDelete={handleDelete}/>
          )
        })}
      </div>
    </>
  )
}

export default Home