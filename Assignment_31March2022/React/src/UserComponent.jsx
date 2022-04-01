/* eslint-disable operator-linebreak */
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
    axios
      .get(`/user/getusername/${username}`)
      .then((res) => {
        console.log(res.data);
        if (res.data.status === 1) {
          document.getElementById('usernametext').textContent = '';
          document.getElementById('usernameerror').textContent =
            res.data.debug_data;
        } else {
          document.getElementById('usernameerror').textContent = '';
          document.getElementById('usernametext').textContent =
            res.data.debug_data;
        }
      })
      .catch((e) => console.log(e));
  };
  const checkEmail = () => {
    axios
      .get(`/user/getemail/${email}`)
      .then((res) => {
        console.log(res.data);
        if (res.data.status === 1) {
          document.getElementById('emailtext').textContent = '';
          document.getElementById('emailerror').textContent =
            res.data.debug_data;
        } else {
          document.getElementById('emailerror').textContent = '';
          document.getElementById('emailtext').textContent =
            res.data.debug_data;
        }
      })
      .catch((e) => console.log(e));
  };

  return (
    <div className="container col-lg-4 col-md-8 mx-auto my-5">
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
        <p>
          <small className="text-success" id="usernametext" />
          <small className="text-danger" id="usernameerror" />
        </p>
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
        <p>
          <small className="text-danger" id="emailerror" />
          <small className="text-success" id="emailtext" />
        </p>
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
