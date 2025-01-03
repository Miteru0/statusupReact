import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles/style.css';

const MyProfile = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    axios
      .get(`${process.env.REACT_APP_API_URL}/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUsername(response.data);
        setLoading(false);
      })
      .catch(() => {
        localStorage.removeItem('token'); // Clear invalid token
        navigate('/login');
      });
  }, [navigate]);

  return (
    <div className="profile-page">
      <h2 className="profile-heading">My Profile</h2>
      {loading ? (
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading...</p>
        </div>
      ) : (
        <div className="profile-card">
          {username ? (
            <>
              <h3>Username:</h3>
              <p>{username}</p>
            </>
          ) : (
            <p>No username found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default MyProfile;
