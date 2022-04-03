/* eslint-disable linebreak-style */
/* eslint-disable react/react-in-jsx-scope */
import {useEffect, useState} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';

export default function EditUser() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState('');
  const [age, setAge] = useState();
  const [dob, setDob] = useState();
  const urlParams = useParams();
  const {id} = urlParams;
  let storedToken = localStorage.getItem('token');
  storedToken = storedToken.replace('"', '');
  storedToken = storedToken.replace('"', '');
  useEffect(() => {
    axios
      .get(`/users/${urlParams.id}`, {
        headers: {
          token: storedToken,
        },
      })
      .then((res) => {
        console.log(res.data);
        setName(res.data[0].name);
        setEmail(res.data[0].email);
        setPassword(res.data[0].password);
        setAge(res.data[0].age);
        setDob(res.data[0].dob);
      })
      .catch((err) => console.log(err));
  }, []);
  const updateData = (e) => {
    e.preventDefault();
    const data = {name, email, password, age, dob};
    axios
      .put(`/users/edituser/${id}`, data)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };
  return (
    <div className="container col-lg-4 col-md-6 mx-auto my-5">
      <form onSubmit={updateData}>
        <input
          type="text"
          name="name"
          className="form-control my-3"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          type="email"
          name="email"
          className="form-control my-3"
          placeholder="Enter Email id"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="password"
          name="password"
          className="form-control my-3"
          placeholder="Enter password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <input
          type="date"
          name="dob"
          className="form-control my-3"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
        />
        <div className="text-center upSpace">
          <button type="submit" className="btn btn-info">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
