import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import MyProfile from '../pages/MyProfile';
import MyCalendars from '../pages/MyCalendars';
import MyFriends from '../pages/MyFriends';
import PrivateRoute from '../components/PrivateRoute';
import Navigator from '../components/Navigator';
import VerifyPage from '../pages/VerifyPage';

function AppRoutes() {
  return (
    <Router>
      <Navigator />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <MyProfile />
            </PrivateRoute>
          }
        />
        <Route
          path="/mycalendars"
          element={
            <PrivateRoute>
              <MyCalendars />
            </PrivateRoute>
          }
        />
        <Route
          path="/myfriends"
          element={
            <PrivateRoute>
              <MyFriends />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/register/verify" element={<VerifyPage />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
