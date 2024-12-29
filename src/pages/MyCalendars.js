// /src/pages/MyCalendars.js
import React from 'react';
import { Link } from 'react-router-dom';

const MyCalendars = () => {
  const calendars = [
    { id: 1, name: 'Work Schedule' },
    { id: 2, name: 'Family Events' },
  ]; // Replace with API data when available

  return (
    <div>
      <h2>My Calendars</h2>
      <ul>
        {calendars.map((calendar) => (
          <li key={calendar.id}>
            <Link to={`/mycalendars/${calendar.id}`}>{calendar.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyCalendars;
