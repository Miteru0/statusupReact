// /src/pages/MyFriends
import React from 'react';
import { Link } from 'react-router-dom';

const MyFriends = () => {
  const friends = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
  ]; // Replace with API data when available

  return (
    <div>
      <h2>My Friends</h2>
      <ul>
        {friends.map((friend) => (
          <li key={friend.id}>
            <Link to={`/myfriends/${friend.id}/calendars`}>{friend.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyFriends;
