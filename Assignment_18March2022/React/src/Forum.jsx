/* eslint-disable object-curly-spacing */
/* eslint-disable operator-linebreak */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable linebreak-style */
import React, {useEffect, useState} from 'react';
import {useFormik} from 'formik';
import axios from 'axios';

function Forums() {
  const [forums, setForums] = useState([]);
  const getforums = () => {
    axios
      .get('/forums')
      .then((res) => {
        setForums(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getforums();
  }, []);
  const formik = useFormik({
    initialValues: {
      title: 'Batman',
      date: '1939-03-30',
      body: 'Men are Brave',
      author: 'Bruce Wayne',
    },
    onSubmit(values) {
      const forum = {
        title: values.title,
        date: values.date,
        body: values.body,
        author: values.author,
      };
      axios
        .post('/forums', forum)
        .then((res) => {
          console.log(res.data.status);
          getforums();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    validate() {
      const errors = {};
      if (formik.values.title.length < 10 || formik.values.title.length > 100) {
        errors.title =
          'Title Should have Minimum 10 characters and Max 100 characters ';
      }
      if (formik.values.body.length < 50 || formik.values.title.length > 500) {
        errors.body =
          'Forum Body Should have Minimum 50 characters and Max 500 characters';
      }
      if (formik.values.author.length < 5 || formik.values.author.length > 50) {
        errors.author =
          'Author Name Should have Minimum 5 characters and Max 50 characters';
      }
      if (!formik.values.author.match(/^[0-9a-zA-Z]+$/)) {
        errors.author = 'Author name sholud have only alphabets';
      }
      return errors;
    },
  });
  const deleteForum = (index) => {
    axios
      .delete(`/forums/${index}`)
      .then((res) => {
        console.log(res.data);
        getforums();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const clearAll = () => {
    axios
      .put('/forums/clearAll')
      .then((res) => {
        getforums();
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="container-fluid">
      <div className="card col-lg-4 col-md-6 col-sm-10">
        <h1>Forum</h1>
        <form onSubmit={formik.handleSubmit} noValidate>
          <input
            type="text"
            name="title"
            className="form-control"
            placeholder="Enter Forum title"
            value={formik.values.title}
            onChange={formik.handleChange}
          />
          <p>
            <span className="text-danger">
              {formik.errors.title ? formik.errors.title : null}
            </span>
          </p>
          <input
            type="date"
            name="date"
            placeholder="Choose date"
            className="form-control"
            value={formik.values.date}
            onChange={formik.handleChange}
          />
          <p />
          <textarea
            placeholder="Enter Forum body"
            name="body"
            className="form-control"
            value={formik.values.body}
            onChange={formik.handleChange}
          />
          <p>
            <span className="text-danger">
              {formik.errors.body ? formik.errors.body : null}
            </span>
          </p>
          <input
            type="text"
            name="author"
            className="form-control"
            placeholder="Enter Author name"
            value={formik.values.author}
            onChange={formik.handleChange}
          />
          <p>
            <span className="text-danger">
              {formik.errors.author ? formik.errors.author : null}
            </span>
          </p>
          <button type="submit">Add Forum</button>
        </form>
      </div>

      <div className="data">
        <h1>Forums List</h1>
        <div className="button">
          <button type="button" onClick={clearAll}>
            Clear All
          </button>
        </div>
        <div>
          {forums.map((val, ind) => (
            <div className="row">
              <div className="col-lg-7 col-md-9">
                <div>{val.title}</div>
                <div>{val.body}</div>
                <div className="text-right pt-5">
                  <span>
                    posted by{' '}
                    <i>
                      <b>{val.author}</b>
                    </i>
                  </span>
                  <br />
                  <span>
                    posted on <b>{val.date}</b>
                  </span>
                </div>
              </div>
              <div className="col-lg-2 col-md-2">
                <button
                  type="button"
                  onClick={() => {
                    deleteForum(ind);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default Forums;
