/* eslint-disable linebreak-style */
import React from 'react';
import axios from 'axios';

export default function Login() {
  const login = (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    axios
      .get(`/exam/login/UserName/${username}/Password/${password}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  };
  return (
    <div className="container col-lg-4 col-md-6 mx-auto my-5 text-center">
      <form onSubmit={login}>
        <h1 className="text-center my-3">Login</h1>
        <input
          type="text"
          name="username"
          className="form-control my-3"
          placeholder="Enter Username"
          required
        />
        <input
          type="password"
          name="password"
          className="form-control my-3"
          placeholder="Enter Password"
          required
        />
        <div className="text-center my-5">
          <button type="submit" className="btn btn-primary col-12">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
