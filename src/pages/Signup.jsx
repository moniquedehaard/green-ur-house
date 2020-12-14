import React, { Component } from "react";
import { signup } from "../services/auth";
import "./auth.css";

import Header from "../components/Header/Header.jsx"
import "./styling.css"

export default class Signup extends Component {
  state = {
    username: "",
    password: "",
    uploadedImage: null,
    error: null,
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleFormSubmission = (event) => {
    event.preventDefault();
    const credentials = {
      username: this.state.username,
      password: this.state.password,
      image: this.state.uploadedImage
    };

    signup(credentials).then((res) => {
      // successful signup
      console.log(res);
      if (!res.status) {
        // unsuccessful signup
      }
      localStorage.setItem("accessToken", res.data.accessToken);
      this.props.authenticate(res.data.user);
      this.props.history.push("/");
    });
  };

  render() {
    return (
      <div className="homepage">
        <div className="homepage_left">
          <Header user={this.props.user} />

          <div className="form">
            <h1> sign up </h1>
            <br />
            <br />

            {/* start form */}
            <form onSubmit={this.handleFormSubmission} className="auth__form">
              <label htmlFor="input-username">Username</label>
              <br/>
              <input
                id="input-username"
                type="text"
                name="username"
                placeholder="Text"
                value={this.state.username}
                onChange={this.handleInputChange}
                required
              />
              <br />
              <br/>
              <label htmlFor="input-password">Password</label>
              <br/>
              <input
                id="input-password"
                type="password"
                name="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.handleInputChange}
                required
                minLength="8"
              />
              <br />
              <br/>

              <label htmlFor="uploadedImage">Your picture</label>
              <br/>
              <input
                id="uploadedImage"
                type="file"
                name="uploadedImage"
                value={this.state.uploadedImage}
                onChange={this.handleInputChange}
              />
              <br />
              <br/>

              {this.state.error && (
                <div className="error-block">
                  <p>There was an error submiting the form:</p>
                  <p>{this.state.error.message}</p>
                </div>
              )}

              <button className="btn_gb" type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
