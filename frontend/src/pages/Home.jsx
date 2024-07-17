import TextbookDisplay from '../components/TextBookDisplay'

const Home = ({textbooks}) => {
  return (
    <>
      <div className="main-container">
        {textbooks.map(textbook => {
          return (
            <TextbookDisplay key={textbook.id} textbook={textbook}/>
          )
        })}
      </div>
    </>
  )
}

export default Home