import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../Styles/Navbar.css'; // Import CSS file for styling

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav>
      <div className="nav-links">
        <Link to="/" className="nav-link">Home</Link>
        {user && <Link to="/tasks" className="nav-link">Tasks</Link>}
      </div>
      <div>
        {user ? (
          <button className="logout-btn" onClick={logout}>Logout</button>
        ) : (
          <div className="nav-links">
            <Link to="/login" className="nav-link-btn">Login</Link>
            <Link to="/signup" className="nav-link-btn">Sign Up</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
