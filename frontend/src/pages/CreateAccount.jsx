import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const CreateAccount = ({signUp}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [errorMessage, setErrorMessage] = useState('') 

  const navigate = useNavigate(); // initialize navigate hook 

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (password.length <= 4 || username.length <= 4) {
      setErrorMessage('password and username length must be atleast 5 characters')
    } else if (password !== passwordConfirm) {
      setErrorMessage('passwords do not match')
    } else if (name === '') {
        setErrorMessage('name cannot be empty')
    } else {
      try {
        await signUp(username, name, passwordConfirm)
        setUsername('')
        setName('')
        setPassword('')
        setPasswordConfirm('')
        setErrorMessage('')
        navigate('/login')
      }
      catch (error) {
        setErrorMessage(error.response.data.error)
      }
    }
  }

  return (
        <form onSubmit={handleSubmit} 
        className="create-form account-form">
        <div>
          <h1>
            Create Account
          </h1>
        </div>
        <div>
          <input className="create-input account-input" 
          type="text" 
          placeholder="username"
          value={username}
          onChange={event => setUsername(event.target.value)}/>
        </div>
        <div>
          <input className="create-input account-input" 
          type="text" 
          placeholder="name"
          value={name}
          onChange={event => setName(event.target.value)}/>
        </div>
        <div>
          <input className="create-input account-input" 
          type="password" 
          placeholder="password"
          vlaue={password}
          onChange={event => setPassword(event.target.value)}/>
        </div>
        <div>
          <input className="create-input account-input" 
          type="password" 
          placeholder="confirm password"
          value={passwordConfirm}
          onChange={event => setPasswordConfirm(event.target.value)}/>
        </div>
        <div>
          <button className="create-btn submit-btn"
          type="submit">Create Account</button>
        </div>
        {errorMessage && <p className='error-message'>{errorMessage}</p>}
      </form>
  )
}

export default CreateAccount