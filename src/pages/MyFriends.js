import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './styles/style.css'; // Import the CSS file

const FriendsPage = () => {
  const [friends, setFriends] = useState([]);
  const [receivedRequests, setReceivedRequests] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);
  const [newFriendUsername, setNewFriendUsername] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchFriendsAndRequests = async () => {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem('token');
      const username = localStorage.getItem('username');
      if (!username) {
        setError('Username not found in localStorage');
        setLoading(false);
        return;
      }

      try {
        const friendsResponse = await axios.get(
          `${process.env.REACT_APP_API_URL}/relationship/${username}/friends`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setFriends(friendsResponse.data);

        const receivedResponse = await axios.get(
          `${process.env.REACT_APP_API_URL}/friends/requests/received`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setReceivedRequests(receivedResponse.data);

        const sentResponse = await axios.get(
          `${process.env.REACT_APP_API_URL}/friends/requests/sent`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setSentRequests(sentResponse.data);

        setLoading(false);
      } catch (err) {
        setError(err.response?.data || 'Failed to fetch data');
        setLoading(false);
      }
    };

    fetchFriendsAndRequests();
  }, []);

  const handleSendRequest = async () => {
    setSuccessMessage('');
    setError('');
    if (!newFriendUsername) {
      setError('Please enter a username.');
      return;
    }

    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/friends/requests/send`,
        { username: newFriendUsername },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 201) {
        setSuccessMessage('Friend request sent successfully!');
        setNewFriendUsername('');
        setTimeout(() => window.location.reload(), 1000);
      }
    } catch (error) {
      if (error.response.status === 409) {
        setError('Friend request already sent.');
      } else if (error.response.status === 404) {
        setError('User not found.');
      } else {
        setError('An error occurred.');
      }
    }
  };

  const handleAnswerRequest = async (relationshipId, isAccepted) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/friends/requests/answer`,
        {
          friendRequestId: relationshipId,
          isAccepted: isAccepted
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        setTimeout(() => window.location.reload(), 1000);
      }
    } catch (error) {
      setError('Failed to answer the friend request.');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="friends-page">
      <h2 className="page-title">🌟 Your Friends</h2>

      <div className="card">
        <h3 className="section-title">Friend List</h3>
        {friends.length === 0 ? (
          <p>You have no friends added yet.</p>
        ) : (
          <ul className="friend-list">
            {friends.map((friend) => (
              <li key={friend}>
                <Link to={`/friends/${friend}/calendars`}>{friend}</Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="card">
        <h3 className="section-title">Send a Friend Request</h3>
        <input
          type="text"
          placeholder="Enter username"
          value={newFriendUsername}
          onChange={(e) => setNewFriendUsername(e.target.value)}
          className="input-field"
        />
        <button className="btn-primary" onClick={handleSendRequest}>
          Send Request
        </button>
        {successMessage && <p className="success-message">{successMessage}</p>}
        {error && <p className="error-message">{error}</p>}
      </div>

      <div className="card">
        <h3 className="section-title">Received Friend Requests</h3>
        {receivedRequests.length === 0 ? (
          <p>No received requests.</p>
        ) : (
          receivedRequests.map((request) => (
            <div key={request.id} className="request-card">
              <p>From: <strong>{request.senderUsername}</strong></p>
              <p>Received on: {new Date(request.createdAt).toLocaleDateString()}</p>
              <div>
                <button
                  className="btn-primary"
                  onClick={() => handleAnswerRequest(request.id, true)}
                >
                  Accept
                </button>
                <button
                  className="btn-secondary"
                  onClick={() => handleAnswerRequest(request.id, false)}
                >
                  Reject
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="card">
        <h3 className="section-title">Sent Friend Requests</h3>
        {sentRequests.length === 0 ? (
          <p>No sent requests.</p>
        ) : (
          sentRequests.map((request) => (
            <div key={request.id} className="request-card">
              <p>To: <strong>{request.receiverUsername}</strong></p>
              <p>Sent on: {new Date(request.createdAt).toLocaleDateString()}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FriendsPage;
