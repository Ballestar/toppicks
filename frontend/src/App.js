import logo from './logo.svg';
import './App.css';
import Home from './views/Home';
import Create from './views/Create'
import ReactDOM from "react-dom";
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
function App() {
  return (
  <Router>
    <React.StrictMode>
      <Routes>
        <Route exact path="/" component={Home} />
        <Route exact path="/Create" component={Create} />
        {/* <Route exact path="/Home" component={App} /> */}
      </Routes>
    </React.StrictMode>
  </Router>
  );
}

export default App;
