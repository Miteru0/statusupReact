import React, { useEffect, useState } from 'react';
import axios from '../axios'; // Ensure to use your configured axios instance
import { Link } from 'react-router-dom';

const MyFriends = () => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFriends = async () => {
      const token = localStorage.getItem('token');
      const username = localStorage.getItem('username'); // Ensure username is saved during login
      if (!username) {
        setError('Username not found in localStorage');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/relationship/${username}/friends`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setFriends(response.data); // Assuming API returns a list of usernames
        setLoading(false);
      } catch (err) {
        setError(err.response?.data || 'Failed to fetch friends');
        setLoading(false);
      }
    };

    fetchFriends();
  }, []);

  if (loading) return <p>Loading friends...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>My Friends</h2>
      {friends.length === 0 ? (
        <p>You have no friends added yet.</p>
      ) : (
        <ul>
          {friends.map((friend) => (
            <li key={friend}>
              <Link to={`/myfriends/${friend}/calendars`}>{friend}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyFriends;
