/* eslint-disable object-curly-newline */
/* eslint-disable react/self-closing-comp */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
// eslint-disable-next-line object-curly-spacing
import {BrowserRouter, Link, Route, Routes} from 'react-router-dom';
import EditUser from './EditUser';
import Members from './Members';
import ProtectedRoute from './ProtectedRoute';
import './App.css';
import Login from './Login';
import Logout from './Logout';
import Registration from './Register';

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <a className="navbar-brand" href="#">
            Album
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
              <Link to="/register" className="nav-item nav-link">
                Register
              </Link>
              <Link to="/login" className="nav-item nav-link">
                Login
              </Link>
              <Link to="/logout" className="nav-item nav-link">
                Logout
              </Link>
            </div>
          </div>
        </nav>
        <Routes>
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />}></Route>
          <Route path="/logout" element={<Logout />}></Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/members" element={<Members />} />
          </Route>
          <Route path="/edituser/:id" element={<EditUser />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
