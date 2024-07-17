import { Link } from 'react-router-dom'

const Login = ({ login, userChange, passwordChange, userVal, passwordVal, errorMessage }) => {

  return (
    <form className="login-form account-form" onSubmit={login}>
      <div>
        <h1>Login</h1>
      </div>
      <div>
        <label htmlFor="username"></label>
        <input
          className="login-input account-input"
          type="text"
          name="username"
          placeholder="username"
          value={userVal}
          onChange={userChange}
        />
      </div>
      <div>
        <label htmlFor="password"></label>
        <input
          className="login-input account-input"
          type="password"
          name="password"
          placeholder="password"
          value={passwordVal}
          onChange={passwordChange}
        />
      </div>
      <div>
        <button className="login-btn submit-btn" type="submit">
          Log In
        </button>
      </div>
      <div>
        <Link to="/create">create account</Link>
      </div>
      {errorMessage && <p className='error-message'>{errorMessage}</p>}
    </form>
  )
}

export default Login