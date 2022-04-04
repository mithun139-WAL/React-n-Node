/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable linebreak-style */
import axios from 'axios';
import React, {useEffect} from 'react';

export default function Logout() {
  useEffect(() => {
    axios
      .get('/logout')
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  }, []);

  return <div className="text-center my-5">Logged Out</div>;
}
