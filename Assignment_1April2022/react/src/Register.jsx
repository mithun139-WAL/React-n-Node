/* eslint-disable linebreak-style */
/* eslint-disable react/react-in-jsx-scope */
import axios from 'axios';

export default function Registration() {
  const addUser = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const age = e.target.age.value;
    const dob = e.target.dob.value;
    axios
      .post('/user/adduser', {name, email, password, age, dob})
      .then((res) => {
        if (res.data.status === 0) {
          alert('Email exists');
        } else {
          alert('User added');
        }
      })
      .catch((e) => console.log(e));
  };
  return (
    <div className="container col-lg-4 col-md-6 mx-auto my-5">
      <form onSubmit={addUser}>
        <h2>Registration</h2>
        <input
          type="text"
          name="name"
          className="form-control my-3"
          placeholder="Enter name"
          required
        />
        <input
          type="text"
          className="form-control my-3"
          placeholder="Enter email id"
          name="email"
          required
        />
        <input
          type="password"
          name="password"
          className="form-control my-3"
          placeholder="Enter password"
          required
        />
        <input type="date" name="dob" className="form-control my-3" required />
        <div className="text-center my-5">
          <button className="btn btn-primary col-12">Register</button>
        </div>
      </form>
    </div>
  );
}
