/* eslint-disable object-curly-newline */
/* eslint-disable react/self-closing-comp */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
// eslint-disable-next-line object-curly-spacing
import {BrowserRouter, Link, Route, Routes} from 'react-router-dom';
import './App.css';
import CreateFile from './components/CreateFile';
import CreateFolder from './components/CreateFolder';
import FolderContents from './components/FolderContents';
import ModifyFile from './components/ModifyFiles';

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
              <Link to="/createfile" className="nav-item nav-link">
                CreateFile
              </Link>
              <Link to="/createfolder" className="nav-item nav-link">
                CreateFolder
              </Link>
              <Link to="/foldercontents" className="nav-item nav-link">
                Folder Contents
              </Link>
              <Link to="/modify" className="nav-item nav-link">
                Modify Contents
              </Link>
            </div>
          </div>
        </nav>
        <Routes>
          <Route path="/createfile" element={<CreateFile />}></Route>
          <Route path="/createfolder" element={<CreateFolder />}></Route>
          <Route path="/foldercontents" element={<FolderContents />}></Route>
          <Route path="/modify" element={<ModifyFile />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
