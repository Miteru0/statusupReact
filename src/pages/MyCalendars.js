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
    <div>
      <h2>My Calendars</h2>
      <button onClick={handleCreateCalendar}>Create New Calendar</button>
      <ul>
      {calendars.map((calendar) => (
        <li key={calendar.id}>
          <Link to={`/mycalendars/${calendar.id}`}>{calendar.name}</Link> {/* Pass calendar.id */}
        </li>
      ))}
    </ul>
    </div>
  );
};

export default MyCalendars;
