/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable linebreak-style */
import React, {useState} from 'react';
import axios from 'axios';

export default function UserRegistration() {
  //   const [status, setStatus] = useState('');
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();

  const addUser = (event) => {
    event.preventDefault();
    const userObj = {
      username: event.target.username.value,
      email: event.target.email.value,
      dob: event.target.dob.value,
      password: event.target.password.value,
    };
    axios
      .post('/user', userObj)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const checkUsername = () => {
    console.log(username);
    if (username.length === 0) {
      alert('Enter username to check');
      return;
    }

    axios
      .get(`/users/getusername/${username}`)
      .then((res) => {
        if (res.data.status === 0) {
          console.log('No username');
        } else {
          console.log('Username found');
        }
      })
      .catch((err) => {
        console.log(err);
        alert('Error while checking username');
      });
  };

  const checkEmail = () => {
    if (email.length === 0) {
      alert('Enter email to check');
      return;
    }
    axios
      .get(`/users/checkemail/${email}`)
      .then((res) => {
        if (res.data.status === 0) {
          console.log('Email id found');
        } else {
          console.log('Email id not found');
        }
      })
      .catch((err) => {
        console.log(err);
        alert('Error while checking email');
      });
  };

  return (
    <div className="col-lg-4 col-md-8 mx-auto my-5">
      <h1>Registration</h1>
      <form onSubmit={addUser}>
        <input
          type="text"
          name="username"
          placeholder="Enter Username"
          className="form-control my-4"
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <div>
          <button
            onClick={checkUsername}
            type="submit"
            className="btn btn-info col-6 ml-5"
          >
            Check UserName
          </button>
        </div>
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          className="form-control my-4"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <div>
          <button
            onClick={checkEmail}
            type="submit"
            className="btn btn-info col-6 ml-5"
          >
            Check Email
          </button>
        </div>
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          className="form-control my-4"
        />
        <input type="date" name="dob" className="form-control my-4" />
        <button type="submit" className="btn btn-primary col-12 my-4">
          Register
        </button>
      </form>
    </div>
  );
}
