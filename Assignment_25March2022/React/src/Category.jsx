/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable linebreak-style */
import React, {useEffect, useState} from 'react';
import axios from 'axios';

function Category() {
  const [categories, setCategories] = useState([]);
  const getCategories = () => {
    axios
      .get('/categoriesmysql')
      .then((res) => {
        setCategories(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getCategories();
  }, []);
  const addCategory = (event) => {
    event.preventDefault();
    const categoryObj = {
      name: event.target.name.value,
      description: event.target.description.value,
    };
    axios.post('/categoriesmysql', categoryObj).then((res) => {
      getCategories();
      console.log(res.data);
    });
  };
  const deleteCategory = (category_id) => {
    axios.delete(`/categoriesmysql/${category_id}`).then((res) => {
      console.log(res.data);
      getCategories();
    });
  };
  const deleteAll = () => {
    axios.delete('/categoriesmysql').then((res) => {
      console.log(res.data);
      getCategories();
    });
  };
  return (
    <div className="container">
      <div className="col-lg-4 col-md-6 col-sm-10 mx-auto">
        <h1>Add Category</h1>
        <form onSubmit={addCategory}>
          <input
            type="text"
            name="name"
            placeholder="Enter Category Name"
            className="form-control"
          />
          <textarea
            name="description"
            className="form-control"
            cols="30"
            rows="10"
            placeholder="Enter Category description"
          />
          <button type="submit">Add Category</button>
        </form>
      </div>
      <div className="text-center">
        <h1>Categories List</h1>
        <button type="button" onClick={() => deleteAll()}>
          Delete all Categories
        </button>
        <table>
          <thead>
            <tr>
              <th>CategoryId</th>
              <th>CategoryName</th>
              <th>Description</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((val) => (
              <tr>
                <td>{val.category_id}</td>
                <td>{val.name}</td>
                <td>{val.description}</td>
                <td>
                  <button
                    type="button"
                    onClick={() => deleteCategory(val.category_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default Category;
