/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable linebreak-style */
/* eslint-disable arrow-body-style */
import axios from 'axios';
import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

export default function Members() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  let storedToken = localStorage.getItem('token');
  storedToken = storedToken.replace('"', '');
  useEffect(() => {
    axios
      .get('/users/', {
        headers: {
          token: storedToken,
        },
      })
      .then((res) => setData(res.data))
      .catch((e) => console.log(e));
  }, []);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Date of birth</th>
            <th>Edit </th>
          </tr>
        </thead>
        <tbody>
          {data.map((val) => {
            return (
              <tr>
                <td>{val.id}</td>
                <td>{val.name}</td>
                <td>{val.email}</td>
                <td>{val.age}</td>
                <td>{val.dob}</td>
                <td>
                  <button
                    className="btn btn-warning"
                    type="submit"
                    onClick={() => navigate(`/edituser/${val.id}`)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
