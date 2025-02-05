import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles/Auth.css'

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiUrl = process.env.REACT_APP_API_URL || 'https://statusup-347c42d4df93.herokuapp.com';
    try {
      const response = await axios.post(`${apiUrl}/authenticate`, {
        username,
        password,
      });

      localStorage.setItem('token', response.data);

      const userResponse = await axios.get(`${apiUrl}/user`, {
        headers: {
          Authorization: `Bearer ${response.data}`,
        },
      });
      localStorage.setItem('username', userResponse.data);
      navigate('/');
      window.location.reload();
    } catch (error) {
      setError('Invalid username or password. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">Login</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="auth-input-group">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="auth-input-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="auth-error">{error}</p>}
        <button className="auth-button" type="submit">
          Login
        </button>
      </form>
      <p className="auth-footer">
        Don't have an account? <a href="/register">Register</a>
      </p>
    </div>
  );
};

export default LoginPage;
