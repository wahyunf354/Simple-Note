import React from "react";
// import logo from '../../../assets/img/logo/logo.svg';
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "../Login";
import Register from "../Register";
import Dashboard from "../Dashboard";
import { Provider } from "react-redux";
import { store } from "../../../config/redux";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/" exact component={Dashboard} />
      </Router>
    </Provider>
  );
}

export default App;
