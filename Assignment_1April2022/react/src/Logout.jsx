/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable linebreak-style */
import React from 'react';

export default function Logout() {
  localStorage.removeItem('token');

  return <div className="text-center my-5">Logged Out</div>;
}
