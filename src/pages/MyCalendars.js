import React, { useEffect, useState } from 'react';
import axios from '../axios'; // Ensure you're using your axios instance
import { Link } from 'react-router-dom';

const MyCalendars = () => {
  const [calendars, setCalendars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCalendars = async () => {
      const token = localStorage.getItem('token');
      const username = localStorage.getItem('username'); // Ensure username is saved during login
      if (!username) {
        setError('Username not found in localStorage');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/calendar/${username}/calendars`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCalendars(response.data); // Assuming API returns a list of calendars
        setLoading(false);
      } catch (err) {
        setError(err.response?.data || 'Failed to fetch calendars');
        setLoading(false);
      }
    };

    fetchCalendars();
  }, []);

  if (loading) return <p>Loading calendars...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>My Calendars</h2>
      <ul>
        {calendars.map((calendar) => (
          <li key={calendar.id}>
            <Link to={`/mycalendars/${calendar.name}`}>{calendar.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyCalendars;
