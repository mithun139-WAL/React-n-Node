/* eslint-disable arrow-body-style */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable linebreak-style */
import React, {useEffect, useState} from 'react';
import axios from 'axios';

function Dishes() {
  const [dishes, setDishes] = useState([]);
  const [categorydata, setCategorydata] = useState([]);
  const getDish = () => {
    axios
      .get('/dishesmysql')
      .then((res) => {
        setDishes(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    axios
      .get('/categoriesmysql')
      .then((response) => {
        console.log('Category Data', response.data.results);
        setCategorydata(response.data.results);
      })
      .catch((error) => {
        console.log('An error occurred:', error.response);
      });
    getDish();
  }, []);
  const addDish = (event) => {
    event.preventDefault();
    console.log(event.target.category.value);
    const authorObj = {
      name: event.target.name.value,
      description: event.target.description.value,
      categories_id: event.target.category.value,
      price: event.target.price.value,
    };
    axios.post('/dishesmysql', authorObj).then((res) => {
      getDish();
      console.log(res.data);
    });
  };
  const deleteDish = (id) => {
    axios.delete(`/dishesmysql/${id}`).then((res) => {
      console.log(res.data);
      getDish();
    });
  };
  const deleteAll = () => {
    axios.delete('/dishesmysql').then((res) => {
      console.log(res.data);
      getDish();
    });
  };
  return (
    <div className="container">
      <div className="col-lg-4 col-md-6 col-sm-10 mx-auto">
        <h1>Add Dish</h1>
        <form onSubmit={addDish}>
          <input
            type="text"
            name="name"
            placeholder="Enter Dish Name"
            className="form-control"
          />
          <textarea
            name="description"
            className="form-control"
            cols="30"
            rows="10"
            placeholder="Enter Dish description"
          />
          <select name="category" id="category" className="form-control">
            {categorydata.map((value) => {
              return <option value={value.category_id}>{value.name}</option>;
            })}
          </select>
          <input
            type="number"
            name="price"
            className="form-control"
            placeholder="Enter Dish Price"
          />
          <button type="submit">Add Dish</button>
        </form>
      </div>
      <div className="text-center">
        <h1>Dishes List</h1>
        <button type="button" onClick={() => deleteAll()}>
          Delete all Dishes
        </button>
        <table>
          <thead>
            <tr>
              <th>DishId</th>
              <th>DishName</th>
              <th>Description</th>
              <th>Price</th>
              <th>CategoryId</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {dishes.map((val) => (
              <tr>
                <td>{val.dish_id}</td>
                <td>{val.name}</td>
                <td>{val.description}</td>
                <td>{val.price}</td>
                <td>{val.categories_id}</td>
                <td>
                  <button type="button" onClick={() => deleteDish(val.dish_id)}>
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
export default Dishes;
