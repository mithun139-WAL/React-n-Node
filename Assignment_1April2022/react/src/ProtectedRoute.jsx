/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-else-return */
/* eslint-disable no-console */
/* eslint-disable linebreak-style */
/* eslint-disable radix */
import {Navigate, Outlet} from 'react-router-dom';
import React from 'react';

export default function ProtectedRoute() {
  const loggedIn = localStorage.getItem('token');
  if (loggedIn) {
    console.log('LoggedIn');
    return <Outlet />;
  } else {
    console.log('Not Logged In');
    return <Navigate to="/" />;
  }
}
