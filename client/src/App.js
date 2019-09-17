import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import UserList from "./components/UserList";
import PrivateRoute from "./components/PrivateRoute";
import LoginForm from "./components/Login";

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Here is my first combo in react and node</h1>
        <h2>should I use redux? maybe but not this time!</h2>
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <Link to="/protected">Register</Link>
        </ul>

        <Route path="/login" component={LoginForm} />
        <PrivateRoute exact path="/protected" component={UserList} />
        {/* <h1> form and authentication </h1> */}
        {/* <Form /> */}
      </div>
    </Router>
  );
}

export default App;
