import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { AuthContext } from '../context/AuthContext';
import '../Styles/LoginPage.css'; // Import the CSS file for styles

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password); // Wait for the login to complete
      navigate('/tasks'); // Redirect to the tasks page
    } catch (error) {
      console.error('Error logging in', error);
    }
  };

  return (
    <form className="login-form" onSubmit={handleLogin}>
      <input
        className="login-input"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        className="login-input"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button className="login-button" type="submit">Login</button>
    </form>
  );
};

export default LoginPage;
