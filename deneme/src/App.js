import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './Components/Login';
import User  from './Components/User';
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
    <Switch >
      <Route exact path="/" component= {Login}/>
      <Route  path="/user/:id" component= {User}/>
    </Switch>
    </Router>
  );
}

export default App;
