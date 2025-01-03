import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import './styles/navigator.css'; // Import external CSS file for styles

const Navigator = () => {
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear token
    setIsLoggedOut(true); // Flag to trigger redirection
  };

  if (isLoggedOut) {
    return <Navigate to="/login" />;
  }

  return (
    token && (
      <nav className="navigator-nav">
        <Link to="/" className="navigator-link">
          My Profile
        </Link>
        <Link to="/mycalendars" className="navigator-link">
          My Calendars
        </Link>
        <Link to="/myfriends" className="navigator-link">
          My Friends
        </Link>
        <button onClick={handleLogout} className="navigator-logoutButton">
          Logout
        </button>
      </nav>
    )
  );
};

export default Navigator;
