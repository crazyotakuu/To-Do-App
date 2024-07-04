import React, { useState } from 'react';
import api from '../api';
import '../Styles/SignUpPage.css'; // Import the CSS file for styles

const SignUpPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/register', { username, email, password });
      alert('User registered successfully');
    } catch (error) {
      console.error('Registration failed', error);
    }
  };

  return (
    <form className="signup-form" onSubmit={handleSignUp}>
      <input
        className="signup-input"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        className="signup-input"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        className="signup-input"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button className="signup-button" type="submit">Sign Up</button>
    </form>
  );
};

export default SignUpPage;
