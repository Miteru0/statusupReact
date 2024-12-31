import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const FriendsPage = () => {
  const [friends, setFriends] = useState([]);
  const [receivedRequests, setReceivedRequests] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);
  const [newFriendUsername, setNewFriendUsername] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch all friends and friend requests
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
        // Fetch friends
        const friendsResponse = await axios.get(
          `${process.env.REACT_APP_API_URL}/relationship/${username}/friends`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setFriends(friendsResponse.data);

        // Fetch received friend requests
        const receivedResponse = await axios.get(
          `${process.env.REACT_APP_API_URL}/friends/requests/received`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setReceivedRequests(receivedResponse.data);

        // Fetch sent friend requests
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

    const token = localStorage.getItem('token'); // Retrieve token inside the function
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/friends/requests/send`,
        { username: newFriendUsername },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 201) {
        setSuccessMessage('Friend request sent successfully!');
        setNewFriendUsername('');
        setTimeout(() => window.location.reload(), 1000); // Refresh to show updated sent requests
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
    const token = localStorage.getItem('token'); // Retrieve token inside the function
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
        setTimeout(() => window.location.reload(), 1000); // Refresh to show updated lists
      }
    } catch (error) {
      setError('Failed to answer the friend request.');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Friends</h2>

      {/* Friend List */}
      {friends.length === 0 ? (
        <p>You have no friends added yet.</p>
      ) : (
        <ul>
          {friends.map((friend) => (
            <li key={friend}>
               <Link to={`/friends/${friend}/calendars`}>{friend}</Link>
            </li>
          ))}
        </ul>
      )}

      {/* Send Friend Request */}
      <div>
        <h3>Send a Friend Request</h3>
        <input
          type="text"
          placeholder="Enter username"
          value={newFriendUsername}
          onChange={(e) => setNewFriendUsername(e.target.value)}
        />
        <button onClick={handleSendRequest}>Send Request</button>
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>

      {/* Received Friend Requests */}
      <div>
        <h3>Received Friend Requests</h3>
        {receivedRequests.length === 0 && <p>No received requests.</p>}
        {receivedRequests.map((request) => (
          <div
            key={request.id}
            style={{
              border: '1px solid #ccc',
              padding: '10px',
              margin: '10px 0',
            }}
          >
            <p>From: <strong>{request.senderUsername}</strong></p>
            <p>Received on: {new Date(request.createdAt).toLocaleDateString()}</p>
            <div>
              <button onClick={() => handleAnswerRequest(request.id, true)}>Accept</button>
              <button onClick={() => handleAnswerRequest(request.id, false)}>Reject</button>
            </div>
          </div>
        ))}
      </div>

      {/* Sent Friend Requests */}
      <div>
        <h3>Sent Friend Requests</h3>
        {sentRequests.length === 0 && <p>No sent requests.</p>}
        {sentRequests.map((request) => (
          <div
            key={request.id}
            style={{
              border: '1px solid #ccc',
              padding: '10px',
              margin: '10px 0',
            }}
          >
            <p>To: <strong>{request.receiverUsername}</strong></p>
            <p>Sent on: {new Date(request.createdAt).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendsPage;
