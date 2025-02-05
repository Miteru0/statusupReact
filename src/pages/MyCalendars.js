import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const MyCalendars = () => {
  const [calendars, setCalendars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch all calendars from the API
  const fetchCalendars = async () => {
    setLoading(true);
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');

    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/calendar/${username}/calendars`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCalendars(response.data);
      setLoading(false);
    } catch (error) {
      setError('Failed to fetch calendars.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCalendars(); // Fetch calendars when the component mounts
  }, []);

  const handleCreateCalendar = async () => {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    const calendarName = prompt('Enter the new calendar name:'); // Simple prompt for calendar name

    if (!calendarName) return;

    const newCalendar = {
      name: calendarName,
      ownerUsername: username,
      accessLevel: 'FRIEND', // Default access level (adjust if needed)
    };

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/calendar`, newCalendar, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Calendar created!');
      fetchCalendars(); // Refresh the calendar list
    } catch (error) {
      alert('Failed to create calendar.');
    }
  };

  if (loading) return <p>Loading calendars...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>My Calendars</h2>
      <button style={styles.button} onClick={handleCreateCalendar}>Create New Calendar</button>
      <ul style={styles.list}>
        {calendars.map((calendar) => (
          <li key={calendar.id} style={styles.listItem}>
            <Link to={`/mycalendars/${calendar.id}`} style={styles.link}>
              {calendar.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start', // Align to the top vertically
    alignItems: 'center', // Center horizontally
    minHeight: '100vh',
    padding: '20px',
    backgroundColor: '#fafafa',
    position: 'relative', // Allows absolute positioning of the button
  },
  heading: {
    fontSize: '2rem',
    fontWeight: '600',
    marginBottom: '20px',
    color: '#333333',
  },
  button: {
    backgroundColor: '#333333',
    color: 'white',
    padding: '12px 25px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    position: 'absolute',
    top: '20px',
    right: '20px',
    transition: 'background-color 0.3s ease, transform 0.2s ease',
  },
  buttonHover: {
    backgroundColor: '#555555',
    transform: 'scale(1.05)',
  },
  list: {
    listStyleType: 'none',
    padding: 0,
    width: '100%',
    maxWidth: '500px',
    marginTop: '80px', // Space between the button and the list
  },
  listItem: {
    backgroundColor: '#ffffff',
    padding: '12px 20px',
    marginBottom: '12px',
    borderRadius: '8px',
    border: '1px solid #e1e1e1',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer', // Make it clear the entire item is clickable
    transition: 'background-color 0.3s ease, transform 0.2s ease',
    textAlign: 'center', // Center the text
  },
  listItemHover: {
    backgroundColor: '#f1f1f1',
    transform: 'scale(1.02)',
  },
  link: {
    color: '#333333',
    fontSize: '16px',
    fontWeight: '500',
    textDecoration: 'none',
    width: '100%',
    display: 'block', // Make the link span the full width of the item
    textAlign: 'center', // Center the text
    padding: '8px 0',
    borderRadius: '8px',
    transition: 'color 0.3s ease, background-color 0.3s ease',
  },
  linkHover: {
    backgroundColor: '#e1e1e1',
    color: '#333333',
  },
};

export default MyCalendars;
