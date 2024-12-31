import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EventPage = () => {
  const { calendarId, eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch event details
  useEffect(() => {
    const fetchEvent = async () => {
      const username = localStorage.getItem('username');
      const token = localStorage.getItem('token');

      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/event/${username}/${calendarId}/${eventId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setEvent(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch event details.');
        setLoading(false);
      }
    };

    fetchEvent();
  }, [calendarId, eventId]);

  if (loading) return <p>Loading event...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>{event.name}</h2>
      <p>{event.description}</p>
      <p>
        Start Date: {event.startDate} <br />
        End Date: {event.endDate}
      </p>
    </div>
  );
};

export default EventPage;
