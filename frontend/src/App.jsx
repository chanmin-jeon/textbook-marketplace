import { useState, useEffect } from 'react'
import loginService from './services/login'
import CreateAccountService from './services/createAccount'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Login from './pages/Login'
import CreateAccount from './pages/CreateAccount'
import Home from './pages/Home'


function App() {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [loginErrorMessage, setLoginErrorMessage] = useState('')
  
  const navigate = useNavigate()

  // use local storage to save user logged in
  useEffect(()=> {
    const loggedUserJson = window.localStorage.getItem('loggedUser')
    if (loggedUserJson) {
      setUser(JSON.parse(loggedUserJson))
    }
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
      setUser(currUser)
      setUsername('')
      setPassword('')
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
      await CreateAccountService.create(newUserInfo)
    }
    catch (exception) {
      throw exception
    }
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Home loggedUser={user} userSet={setUser}/>}>
        </Route>
        <Route path='/login' element={<Login login={handleLogin} 
        userChange={event => setUsername(event.target.value)}
        passwordChange={event => setPassword(event.target.value)}
        userVal={username} 
        passwordVal={password}
        errorMessage={loginErrorMessage}/>}>
        </Route>
        <Route path='/create' element={<CreateAccount signUp={handleSignUp}/>}> 
        </Route>
      </Routes>
    </>
  )
}

export default App
