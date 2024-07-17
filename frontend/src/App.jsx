import { useState, useEffect } from 'react'
import loginService from './services/login'
import createAccountService from './services/createAccount'
import textbookService from './services/textbooks'
import conversationService from './services/conversation'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Login from './pages/Login'
import CreateAccount from './pages/CreateAccount'
import Home from './pages/Home'
import SellItem from './pages/SellItem'
import MyListings from './pages/MyListings'
import Header from './components/Header'
import ConvoToggle from './components/ConvoToggle'

const App = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [textbooks, setTextbooks] = useState([])
  const [chatVisible, setChatVisible] = useState(false)
  const [conversations, setConversations] = useState([])
  
  const navigate = useNavigate()

  // use local storage to save user logged in on refresh
  useEffect(() => {
    const fetchUserData = async () => {
      const loggedUserJson = window.localStorage.getItem('loggedUser')
      if (loggedUserJson) {
        const user = JSON.parse(loggedUserJson)
        setUser(user)
        textbookService.setToken(user.token)
        
        // get conversations if user logged in
        try {
          const userConversations = await conversationService.getAllUserConvo(user.id)
          setConversations(userConversations)
        } catch (error) {
          console.error('Error fetching conversations:', error)
        }
      }
    }
  
    fetchUserData()
  }, [])

  // get textbook listings 
  useEffect(() => {
    const fetchTextbooks = async () => {
      try {
        const texts = await textbookService.getAll()
        setTextbooks(texts)
      } catch (error) {
        console.error('Failed to fetch textbooks:', error)
      }
    }
    fetchTextbooks()
  }, [])

  // login handler 
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const userInfo = {
        username, password
      }
      // get user
      const currUser = await loginService.login(userInfo)
      window.localStorage.setItem('loggedUser', JSON.stringify(currUser))
      textbookService.setToken(currUser.token) // set token
      // set user
      setUser(currUser)
      // get user conversations
      const userConversations = await conversationService.getAllUserConvo(currUser.id)
      setConversations(userConversations)
      setUsername('')
      setPassword('')
      setErrorMessage('')
      navigate('/')
    } 
    catch (exception) {
      setErrorMessage(exception.response.data.error)
    }
  }

  // create account handler 
  const handleSignUp = async (username, name, password) => {
    try {
      const newUserInfo = {
        username, 
        name, 
        password
      }
      await createAccountService.create(newUserInfo)
    }
    catch (exception) {
      throw exception
    }
  }

  const handleNewListing = async (title, authors, category, price, imageFile) => {
    try {
      const newListing = {
        title, 
        authors, 
        category,
        price, 
        imageFile
      }
      const savedListing = await textbookService.createListing(newListing)
      // update from front end
      const listingWithSeller = {
        ...savedListing,
        seller: {
          id: user.id,
          username: user.username
        }
      }
      
      // Update the textbooks state with the new listing
      setTextbooks(textbooks => [...textbooks, listingWithSeller])
    } catch (error) {
      setErrorMessage(error.response.data.error)
      window.localStorage.clear()
      setUser(null)
      navigate('/login')
    }
  }

  const handleDelete = async (id) => {
    try {
      await textbookService.deleteListing(id)
      const newTextbooks = textbooks.filter(textbook => textbook.id !== id)
      setTextbooks(newTextbooks)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <header>
        <Header user={user} setUser={setUser}></Header>
      </header>
      <ConvoToggle chatVisible={chatVisible} setChatVisible={setChatVisible} conversations={conversations} user={user}/>
      <Routes>
        <Route path="/" element={<Home user={user} textbooks={textbooks} 
        handleDelete={handleDelete} conversations={conversations} 
        setConversations={setConversations}
        setChatVisible={setChatVisible}/>}/>
        <Route path='/login' element={<Login login={handleLogin} 
        userChange={event => setUsername(event.target.value)}
        passwordChange={event => setPassword(event.target.value)}
        userVal={username} 
        passwordVal={password}
        errorMessage={errorMessage}/>}/>
        <Route path='/create' element={<CreateAccount signUp={handleSignUp}/>}/>
        <Route path='/sell' element={<SellItem newListing={handleNewListing} errorMessage={errorMessage}/>}/>
        <Route path='/mylistings' element={<MyListings user={user} textbooks={textbooks} handleDelete={handleDelete}/>}/>
      </Routes>
    </>
  )
}

export default App
