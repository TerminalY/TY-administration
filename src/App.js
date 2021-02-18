import React from 'react';
import Inventory from './components/Inventory'
import Home from './components/Home'
import Orders from './components/Orders'
import Navbar from './components/Navbar'
import Users from './components/Users'
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Route exact path="/" component={Home} />
        <Route path="/inventory" component={Inventory} />
        <Route path="/users" component={Users} />
        <Route path="/orders" component={Orders} />
      </div>
    </Router>
  );
}

export default App;
