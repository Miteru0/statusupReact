import React, { useEffect, useState } from 'react';
import axios from '../axios';
import { useParams, useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar'; // Import react-calendar
import 'react-calendar/dist/Calendar.css'; // Import CSS for styling

const CalendarPage = () => {
  const { calendarname, username } = useParams(); // Get calendar and username from the URL
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login'); // Redirect to login if token is missing
        return;
      }

      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/calendar/${username || 'me'}/${calendarname}/events`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setEvents(response.data); // Assuming the events data is returned from API
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.error('Failed to fetch events:', err.response?.data || err.message);
      }
    };

    fetchEvents();
  }, [calendarname, username, navigate]);

  const handleDateChange = (date) => {
    setCurrentDate(date); // Change the selected date
  };

  const getEventsForDate = (date) => {
    const dateString = date.toISOString().split('T')[0]; // Convert date to YYYY-MM-DD format
    return events.filter(event => event.startDate === dateString); // Filter events for that day
  };

  const renderEventDetails = (eventsForDay) => {
    return eventsForDay.map((event, index) => (
      <div key={index}>
        <strong>{event.name}</strong> <br />
        <em>{event.startDate}</em> <br />
        {event.description && <p>{event.description}</p>}
      </div>
    ));
  };

  if (loading) return <p>Loading events...</p>;

  return (
    <div>
      <h2>{calendarname}</h2>
      <Calendar
        onChange={handleDateChange}
        value={currentDate}
      />
      <div>
        <h3>Events for {currentDate.toLocaleDateString()}</h3>
        {getEventsForDate(currentDate).length === 0 ? (
          <p>No events for this day.</p>
        ) : (
          renderEventDetails(getEventsForDate(currentDate))
        )}
      </div>
    </div>
  );
};

export default CalendarPage;
