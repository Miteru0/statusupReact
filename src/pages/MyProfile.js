// src/pages/MyProfile.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MyProfile = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

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
      })
      .catch(() => {
        localStorage.removeItem('token'); // Clear invalid token
        navigate('/login');
      });
  }, [navigate]);

  return (
    <div>
      <h2>My Profile</h2>
      {username ? <p>Username: {username}</p> : <p>Loading...</p>}
    </div>
  );
};

export default MyProfile;
