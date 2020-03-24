import React, { Component } from "react";
import "./Register.scss";
import Button from "../../../components/atoms/Button";
import { connect } from "react-redux";
import { registerUserAPI } from "../../../config/redux/action";

class Register extends Component {
  state = {
    email: "",
    password: ""
  };

  hendelChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  hendleClickButtonRes = async () => {
    const { email, password } = this.state;
    const res = await this.props
      .registerIPA({ email, password })
      .catch(err => err);
    if (res) {
      this.setState({
        email: "",
        password: ""
      });
    }
  };

  render() {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <p className="auth-title">Register</p>
          <label className="label" htmlFor="password">
            Email
          </label>
          <input
            placeholder="email"
            className="input"
            type="email"
            id="email"
            onChange={this.hendelChange}
            value={this.state.email}
          />
          <label className="label" htmlFor="password">
            Password
          </label>
          <input
            placeholder="password"
            className="input"
            type="password"
            id="password"
            onChange={this.hendelChange}
            value={this.state.password}
          />
          <Button
            onClick={this.hendleClickButtonRes}
            loading={this.props.isLoading}
            title="Register"
          />
        </div>
      </div>
    );
  }
}

const reduxState = state => ({
  isLoading: state.isLoading
});

const reduxDispatch = dispacth => ({
  registerIPA: data => dispacth(registerUserAPI(data))
});

export default connect(reduxState, reduxDispatch)(Register);
