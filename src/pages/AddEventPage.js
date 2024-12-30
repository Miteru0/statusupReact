import React, { useState } from 'react';
import axios from '../axios';
import { useNavigate, useParams } from 'react-router-dom';

const AddEventPage = () => {
  const { calendarname, username } = useParams();
  const navigate = useNavigate();
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventStartDate, setEventStartDate] = useState('');
  const [eventEndDate, setEventEndDate] = useState('');
  const [accessLevel, setAccessLevel] = useState('FRIEND'); // Default access level is FRIEND
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');
      return;
    }

    setLoading(true);
    setErrorMessage(null);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/calendar/${username || 'me'}/${calendarname}`,
        {
          name: eventName,
          startDate: eventStartDate,
          endDate: eventEndDate,
          description: eventDescription,
          accessLevel: accessLevel, // Use the selected access level
          notificationEnabled: false,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoading(false);
      navigate(`/mycalendars/${calendarname}`);
    } catch (err) {
      setLoading(false);
      setErrorMessage(err.response?.data?.message || 'Failed to create event.');
      console.error('Error creating event:', err.response?.data || err.message);
    }
  };

  return (
    <div>
      <h2>Add Event to {calendarname}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Event Name:</label>
          <input
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Event Description:</label>
          <textarea
            value={eventDescription}
            onChange={(e) => setEventDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Start Date:</label>
          <input
            type="date"
            value={eventStartDate}
            onChange={(e) => setEventStartDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>End Date:</label>
          <input
            type="date"
            value={eventEndDate}
            onChange={(e) => setEventEndDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Access Level:</label>
          <select
            value={accessLevel}
            onChange={(e) => setAccessLevel(e.target.value)}
          >
            <option value="FRIEND">Friend</option>
            <option value="ACQUAINTANCE">Acquaintance</option>
            <option value="NONE">None</option>
          </select>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Creating Event...' : 'Create Event'}
        </button>
      </form>

      {/* Show error message if event creation fails */}
      {errorMessage && (
        <div style={{ color: 'red', marginTop: '10px' }}>
          <strong>Error: </strong>{errorMessage}
        </div>
      )}
    </div>
  );
};

export default AddEventPage;
