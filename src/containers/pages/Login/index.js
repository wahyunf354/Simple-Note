import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "../../../components/atoms/Button";
import { loginUserAPI } from "../../../config/redux/action";

class Login extends Component {
  state = {
    email: "",
    password: ""
  };

  hendelChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  hendleClickButtonLog = async () => {
    const { email, password } = this.state;
    const { history } = this.props;
    const res = await this.props
      .loginIPA({ email, password })
      .catch(err => err);
    if (res) {
      console.log("login success", res);
      localStorage.setItem("userData", JSON.stringify(res));
      this.setState({
        email: "",
        password: ""
      });
      history.push("/");
    } else {
      console.log("login gagal");
    }
  };

  render() {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <p className="auth-title">Login Page</p>
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
            onClick={this.hendleClickButtonLog}
            loading={this.props.isLoading}
            title="Login"
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
  loginIPA: data => dispacth(loginUserAPI(data))
});

export default connect(reduxState, reduxDispatch)(Login);
