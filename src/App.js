import React, { useEffect } from 'react';
import AppRoutes from './routes';
import axios from './axios';

function App() {
  useEffect(() => {
    const fetchUsername = async () => {
      const token = localStorage.getItem('token');
      if (token && !localStorage.getItem('username')) {
        try {
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/user`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          localStorage.setItem('username', response.data);
        } catch (error) {
          console.error('Error fetching username:', error.response?.data || error.message);
          localStorage.removeItem('token'); // Clear invalid token
        }
      }
    };

    fetchUsername();
  }, []);

  return (
    <div className="App">
      <AppRoutes />
    </div>
  );
}

export default App;
