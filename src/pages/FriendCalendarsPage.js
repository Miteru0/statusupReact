import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const FriendCalendarsPage = () => {
  const { friendUsername } = useParams();
  const [calendars, setCalendars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFriendCalendars = async () => {
      setLoading(true);
      const token = localStorage.getItem('token');

      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/calendar/${friendUsername}/calendars`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setCalendars(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch friend\'s calendars.');
        setLoading(false);
      }
    };

    fetchFriendCalendars();
  }, [friendUsername]);

  if (loading) return <p>Loading friend’s calendars...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>{friendUsername}'s Calendars</h2>
      {calendars.length > 0 ? (
        <ul>
          {calendars.map((calendar) => (
            <li key={calendar.id}>
              <Link to={`/friendscalendars/${calendar.id}`}>{calendar.name}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No calendars available.</p>
      )}
    </div>
  );
};

export default FriendCalendarsPage;
