import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './styles/style.css'; // Make sure the correct path is used

const AddEventPage = () => {
  const { calendarId } = useParams();
  const [eventName, setEventName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleAddEvent = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');

    const newEvent = {
      name: eventName,
      startDate,
      endDate,
      description,
      accessLevel: 'FRIEND', // Adjust if needed
      notificationEnabled: true, // Default value
    };

    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/calendar/${calendarId}`,
        newEvent,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Event added!');
      setEventName('');
      setStartDate('');
      setEndDate('');
      setDescription('');
    } catch (error) {
      console.error('Failed to add event:', error);
      setError('Failed to add event. Please try again.');
    }
  };

  return (
    <div className="add-event-container">
      <h2>Add Event to Calendar ID: {calendarId}</h2>
      <form onSubmit={handleAddEvent} className="add-event-form">
        <label>
          Event Name:
          <input
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Start Date:
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          End Date:
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <br />
        <button type="submit" className="btn-primary">Add Event</button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default AddEventPage;
