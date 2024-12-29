// src/components/Navigator.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navigator = () => {
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear token
    window.location.href = '/login'; // Redirect to login
  };

  return (
    token && (
      <nav style={styles.nav}>
        <Link to="/" style={styles.link}>
          My Profile
        </Link>
        <Link to="/mycalendars" style={styles.link}>
          My Calendars
        </Link>
        <Link to="/myfriends" style={styles.link}>
          My Friends
        </Link>
        <button onClick={handleLogout} style={styles.logoutButton}>
          Logout
        </button>
      </nav>
    )
  );
};

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-around',
    backgroundColor: '#333',
    padding: '10px',
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    padding: '10px',
  },
  logoutButton: {
    backgroundColor: '#f00',
    color: 'white',
    border: 'none',
    padding: '10px',
    cursor: 'pointer',
  },
};

export default Navigator;
