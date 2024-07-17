import { useState, useEffect } from 'react'
import loginService from './services/login'
import createAccountService from './services/createAccount'
import textbookService from './services/textbooks'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Login from './pages/Login'
import CreateAccount from './pages/CreateAccount'
import Home from './pages/Home'
import SellItem from './pages/SellItem'
import Header from './components/Header'

const App = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [loginErrorMessage, setLoginErrorMessage] = useState('')
  const [textbooks, setTextbooks] = useState([])
  
  const navigate = useNavigate()

  // use local storage to save user logged in
  useEffect(()=> {
    const loggedUserJson = window.localStorage.getItem('loggedUser')
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      setUser(user)
      textbookService.setToken(user.token)
    }
  }, [])

  // get textbook listings 
  useEffect(() => {
    const fetchTextbooks = async () => {
      try {
        const texts = await textbookService.getAll()
        setTextbooks(texts)
        console.log(texts) // log fetched textbooks
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
      const currUser = await loginService.login(userInfo)
      window.localStorage.setItem('loggedUser', JSON.stringify(currUser))
      textbookService.setToken(currUser.token)
      setUser(currUser)
      setUsername('')
      setPassword('')
      setLoginErrorMessage('')
      navigate('/')
    } 
    catch (exception) {
      setLoginErrorMessage(exception.response.data.error)
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
      setTextbooks(textbooks.concat(savedListing))
      console.log('info after saving to db', savedListing)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <header>
        <Header user={user} setUser={setUser}></Header>
      </header>
      <Routes>
        <Route path="/" element={<Home loggedUser={user} setUser={setUser} textbooks={textbooks}/>}/>
        <Route path='/login' element={<Login login={handleLogin} 
        userChange={event => setUsername(event.target.value)}
        passwordChange={event => setPassword(event.target.value)}
        userVal={username} 
        passwordVal={password}
        errorMessage={loginErrorMessage}/>}/>
        <Route path='/create' element={<CreateAccount signUp={handleSignUp}/>}/>
        <Route path='/sell' element={<SellItem newListing={handleNewListing}/>}/>
      </Routes>
    </>
  )
}

export default App
