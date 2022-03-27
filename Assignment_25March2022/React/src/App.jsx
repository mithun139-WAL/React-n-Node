/* eslint-disable object-curly-newline */
/* eslint-disable react/self-closing-comp */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
// eslint-disable-next-line object-curly-spacing
import {BrowserRouter, Link, Route, Routes} from 'react-router-dom';
import './App.css';
import Author from './Author';
import Category from './Category';
import City from './City';
import Photos from './components/Photos';
import Dishes from './Dishes';
import NameValue from './NameValue';
import Todos from './Todos';
import User from './User';

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <a className="navbar-brand" href="#">
            UserApp
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <Link to="/todos" className="nav-item nav-link">
                Add Todos
              </Link>
              <Link to="/authors" className="nav-item nav-link">
                Authors
              </Link>
              <Link to="/user" className="nav-item nav-link">
                Users
              </Link>
              <Link to="/photos" className="nav-item nav-link">
                Photos
              </Link>
              <Link to="/city" className="nav-item nav-link">
                City
              </Link>
              <Link to="/nameandvalue" className="nav-item nav-link">
                Name and VAlue to be Expired
              </Link>
              <Link to="/dishes" className="nav-item nav-link">
                Add Dishes
              </Link>
              <Link to="/category" className="nav-item nav-link">
                Set Category
              </Link>
            </div>
          </div>
        </nav>
        <Routes>
          <Route path="/todos" element={<Todos />}></Route>
          <Route path="/authors" element={<Author />}></Route>
          <Route path="/user" element={<User />}></Route>
          <Route path="/photos" element={<Photos />}></Route>
          <Route path="/city" element={<City />}></Route>
          <Route path="/category" element={<Category />}></Route>
          <Route path="/dishes" element={<Dishes />}></Route>
          <Route path="/nameandvalue" element={<NameValue />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
