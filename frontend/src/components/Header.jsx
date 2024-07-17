import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';

const Header = ({ user, setUser }) => {

  const handleLogout = () => {
    window.localStorage.clear();
    setUser(null);
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
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/">About</Link>
            </li>
          </ul>
        ) : (
          <>
            <p className='header-greeting'>Hi, {user.name}</p>
            <ul>
              <li>
                <Link to="/">Buy</Link>
              </li>
              <li>
                <Link to="/sell">Sell</Link>
              </li>
              <li>
                <Link to="/chat">Chat</Link>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </>
        )}
      </nav>
    </div>
  );
};

export default Header;