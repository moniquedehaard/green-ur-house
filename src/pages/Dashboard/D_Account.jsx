import React, { Component } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";

export default class D_Account extends Component {
  state = {};
  render() {
    // if (this.state.isLoading) {
    //     return (
    //         <div className="loading_block">
    //             <Header user={this.props.user} />
    //             <h1> Loading... </h1>
    //         </div>

    //     )
    // }

    return (
      <div className="homepage">
        <div className="homepage_left">
          <Header user={this.props.user} />

          <div className="form">
            <div className="title_block">
              <h1> your account </h1>
              <button
                className="btn_gb"
                onClick={() => this.props.history.goBack()}
              >
                {" "}
                Go back{" "}
              </button>
            </div>
            <br />
            <br />
            <h3> Username</h3>
            <p> {this.props.user.username}</p>
            <br />
            <br />
            <br />
            <Link className="btn__link" style={{ fontSize: "20px" }} to="#">
              {" "}
              Edit your account
            </Link>
            <br />
            <br />
            <Link className="btn__link" style={{ fontSize: "20px" }} to="#">
              {" "}
              Edit your password
            </Link>
          </div>
        </div>
        <div className="homepage_right"></div>
      </div>
    );
  }
}
