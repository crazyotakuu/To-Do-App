import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../Styles/Navbar.css';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  console.log('User:', user);
  return (
    <nav>
      <div className="nav-links">
        <Link to="/" id="nav-link-head">To-Do App</Link>
      </div>
      <div>
        {user ? (
          <div className="nav-links">
            {/* <button to="/login" className="nav-link-btn" onClick={logout}>Logout</button> */}
            {user && <Link to="/tasks" className="nav-link-btn">Tasks</Link>}
            <Link to="/login" className="nav-link-btn" onClick={logout}>Logout</Link>
          </div>
          
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
