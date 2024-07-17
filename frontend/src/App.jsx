import { useState } from 'react'
import LoginPage from './components/LoginPage'

function App() {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')


  const handleLogin = (event) => {
    event.preventDefault()
    console.log('username: ', username)
    console.log('password: ', password)
    setUsername('')
    setPassword('')
  }

  return (
    <>
      <LoginPage login={handleLogin} 
        userChange={event => setUsername(event.target.value)}
        passwordChange={event => setPassword(event.target.value)}
        userVal={username} 
        passwordVal={password}
      />
    </>
  )
}

export default App
