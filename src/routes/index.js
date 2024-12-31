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
import CalendarPage from '../pages/CalendarPage'; // Import the CalendarPage
import AddEventPage from '../pages/AddEventPage'; // Import the AddEventPage
import EventPage from '../pages/EventPage'; // Import EventPage
import FriendCalendarsPage from '../pages/FriendCalendarsPage';

function AppRoutes() {
  return (
    <Router>
      <Navigator />
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/register/verify" element={<VerifyPage />} />

        {/* Private routes */}
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
        <Route
          path="/friends/:friendUsername/calendars"
          element={
            <PrivateRoute>
              <FriendCalendarsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/friendscalendars/:calendarId"
          element={
            <PrivateRoute>
              <CalendarPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/mycalendars/:calendarId"  // Expect calendarId as a parameter
          element={
            <PrivateRoute>
              <CalendarPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/mycalendars/:calendarId/addevent"
          element={
            <PrivateRoute>
              <AddEventPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/mycalendars/:calendarId/:eventId"
          element={
            <PrivateRoute>
              <EventPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
