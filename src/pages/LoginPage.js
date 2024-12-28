import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiUrl = process.env.REACT_APP_API_URL || 'https://statusup-347c42d4df93.herokuapp.com';  // Default to localhost:8080 if env variable is not set
    try {
      const response = await axios.post(`${apiUrl}/authenticate`, {
        username,
        password,
      });

      // Save the JWT token to localStorage
      localStorage.setItem('token', response.data);

      // Redirect to profile page after successful login
      navigate('/');
    } catch (error) {
      // Log the error to the console for debugging
      console.error('Error logging in:', error.response?.data || error.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <a href="/register">Register</a>
      </p>
    </div>
  );
};

export default LoginPage;
