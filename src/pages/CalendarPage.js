import React, { useEffect, useState } from 'react';
import axios from '../axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import enUS from 'date-fns/locale/en-US';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 0 }),
  getDay,
  locales,
});

const CalendarPage = () => {
  const { calendarId } = useParams();
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      const username = localStorage.getItem('username');
      const token = localStorage.getItem('token');

      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/calendar/${username}/${calendarId}/events`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const mappedEvents = response.data.map((event) => ({
          id: event.id,
          title: event.name,
          start: new Date(event.startDate),
          end: new Date(event.endDate),
          allDay: event.allDay || false,
        }));
        setEvents(mappedEvents);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch events.');
        setLoading(false);
      }
    };

    fetchEvents();
  }, [calendarId]);

  if (loading) return <p>Loading calendar...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Calendar</h2>
      <button
        onClick={() => navigate(`/mycalendars/${calendarId}/addevent`)}
        style={{
          marginBottom: '20px',
          padding: '10px 20px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Add Event
      </button>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        onSelectEvent={(event) => {
          window.location.href = `/mycalendars/${calendarId}/${event.id}`;
        }}
      />
    </div>
  );
};

export default CalendarPage;
