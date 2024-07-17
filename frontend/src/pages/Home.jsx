import TextbookDisplay from '../components/TextBookDisplay'
import { useState } from 'react'

const Home = ({user, textbooks, handleDelete, conversations, setConversations, setChatVisible}) => {
  const [searchVal, setSearchVal] = useState('')

  const handleSearch = (event) => {
    setSearchVal(event.target.value.toLowerCase())
  }

  const textbooksToShow = searchVal === '' 
  ? textbooks 
  : textbooks.filter(textbook => 
      textbook.title.toLowerCase().includes(searchVal) ||
      textbook.authors.some(author => author.toLowerCase().includes(searchVal)) ||
      textbook.category.toLowerCase().includes(searchVal)
    )

  return (
    <>
      <div className="main-container home-display">
        <div className='searchbar-container'>
          <input 
          className='search-bar'
          type="search" 
          placeholder='search by title, author, or subject'
          value={searchVal}
          onChange={handleSearch}/>
        </div>
        <div className='textbooks-container'>
          {textbooksToShow.map(textbook => {
            return (
              <TextbookDisplay user={user} key={textbook.id} 
              textbook={textbook} handleDelete={handleDelete} 
              setChatVisible={setChatVisible}
              conversations={conversations} 
              setConversations={setConversations}/>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default Home