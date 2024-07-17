import logo from '../assets/logo.png'
import { Link, useNavigate } from 'react-router-dom'

const Header = ({ user, setUser }) => {

  const navigate = useNavigate()

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
    navigate('/')
  };

  return (
    <div className="main-header">
      <div className="logo-title-container">
        <img className="logo" src={logo} alt="TextBookHaven logo" />
        <h3>TextBookHaven</h3>
      </div>
      <nav>
        {!user ? (
          <ul>
            <li>
              <Link className="header-link" to="/">Shop</Link>
            </li>
            <li>
              <Link className="header-link" to="/login">Login</Link>
            </li>
          </ul>
        ) : (
          <>
            <ul>
              <li>
                <Link className="header-link" to="/">Shop</Link>
              </li>
              <li>
                <Link className="header-link" to="/sell">Sell</Link>
              </li>
              <li>
                <Link className="header-link" to="/mylistings">My Listings</Link>
              </li>
            </ul>
            <div className="account-info-container">
              <p>{user.username}</p>
              <button className='logout-btn' onClick={handleLogout}>Logout</button>
            </div>
          </>
        )}
      </nav>
    </div>
  );
};

export default Header;