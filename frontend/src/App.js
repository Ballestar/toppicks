import logo from './logo.svg';
import './App.css';
import Home from './views/Home';
import Create from './views/Create'
import Login from './views/Login'
import ReactDOM from "react-dom";
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
function App() {
  return (
    <Router>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/Home" element={<Home/>} />
          <Route exact path="/Create" element={<Create/>} />
          <Route exact path="/Login" element={<Login/>} />
        </Routes>
    </Router>
  );
}

export default App;
