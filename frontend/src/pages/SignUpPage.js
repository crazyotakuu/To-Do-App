import React, { useState } from 'react';
import api from '../api';
import '../Styles/SignUpPage.css';
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const errors = {};

    if (!username) {
      errors.username = 'Username is required';
    }

    if (!email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email address is invalid';
    }

    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    return errors;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        await api.post('/api/register', { username, email, password });
        alert('User registered successfully');
        navigate('/login');
      } catch (error) {
        console.error('Registration failed', error);
      }
   }
  };

  return (
    <>
      <h1>Signup</h1>
      <form className="signup-form" onSubmit={handleSignUp}>
        <input
          className="signup-input"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        {errors.username && <p className="error-message">{errors.username}</p>}
        <input
          className="signup-input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        {errors.email && <p className="error-message">{errors.email}</p>}
        <input
          className="signup-input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        {errors.password && <p className="error-message">{errors.password}</p>}
        <button className="signup-button" type="submit">Sign Up</button>
      </form>
   </>
  );
};

export default SignUpPage;
