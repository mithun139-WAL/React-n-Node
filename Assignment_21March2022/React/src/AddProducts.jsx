/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable linebreak-style */
import React, {useEffect, useState} from 'react';
import axios from 'axios';

function AddProduct() {
  const [products, setProducts] = useState([
    {
      name: 'Remote Car',
      price: '12345',
      description: 'Wireless Remote control Car',
      category: 'toys',
      status: 'available',
    },
  ]);
  const getProducts = () => {
    axios
      .get('/product')
      .then((res) => {
        setProducts(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getProducts();
  }, []);
  const addProduct = (event) => {
    event.preventDefault();
    const productObj = {
      name: event.target.name.value,
      price: event.target.price.value,
      description: event.target.description.value,
      category: event.target.category.value,
      status: event.target.status.value,
    };
    axios
      .post('/product', productObj)
      .then((res) => {
        console.log(res);
        getProducts();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const deleteItem = (index) => {
    axios
      .delete(`/product/${index}`)
      .then((res) => {
        console.log(res.data);
        getProducts();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const deleteAll = () => {
    axios
      .put('/product')
      .then((res) => {
        getProducts();
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="container-fluid">
      <div className="card col-lg-4 col-md-6 col-sm-10">
        <h1>Add Product</h1>
        <form onSubmit={addProduct}>
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="Enter Product Name"
          />
          <input
            type="number"
            name="price"
            className="form-control"
            placeholder="Enter product Price"
          />
          <textarea
            placeholder="Enter description"
            className="form-control"
            name="description"
          />
          <select name="category" className="form-control">
            <option value="clothes">Clothes</option>
            <option value="fooditems">FoodItems</option>
            <option value="toys">Toys</option>
          </select>
          <select name="status" className="form-control">
            <option value="available">Available</option>
            <option value="notavailable">Not Available</option>
          </select>
          <button type="submit">Add Product</button>
        </form>
      </div>

      <div className="data">
        <h1>Products</h1>
        <div className="button">
          <button type="button" onClick={deleteAll}>
            Clear All
          </button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Price</th>
              <th>Description</th>
              <th>Category</th>
              <th>Status</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {products.map((val, index) => (
              <tr>
                <td className="name">{val.name}</td>
                <td className="price">₹{val.price}</td>
                <td className="description">{val.description}</td>
                <td className="category">{val.category}</td>
                <td className="status">{val.status}</td>
                <td>
                  <button
                    type="button"
                    onClick={() => {
                      deleteItem(index);
                    }}
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
export default AddProduct;
