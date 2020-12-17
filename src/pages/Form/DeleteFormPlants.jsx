import React, { Component } from "react";
import { getHomePlantById, deleteHomePlant } from "../../services/homePlants";
import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import "../styling.css";

export default class DeleteFormPlants extends Component {
  state = {
    plant: "",
    nickname: "",
    room: "",
    notes: "",
    isLoading: true,
  };

  componentDidMount = () => {
    getHomePlantById(this.props.computedMatch.params.id).then((res) => {
      // console.log(res.foundPlant)

      this.setState({
        plant: res.foundPlant.species.latinName,
        nickname: res.foundPlant.nickname,
        room: res.foundPlant.room,
        notes: res.foundPlant.notes,
        isLoading: false,
      });
    });
  };

  handleClick = (event) => {
    const plant = {
      plant: this.state.plant,
      nickname: this.state.nickname,
      room: this.state.room,
      notes: this.state.notes,
    };

    deleteHomePlant(this.props.computedMatch.params.id, plant).then((res) => {
      if (!res.status) {
        return (
          <div className="ErrorMessage">
            <h1> Oops, something went wrong! Go to the homepage! </h1>
            <Link to="/"> Go to homepage </Link>
          </div>
        );
      }
      //Update user in app.js
      this.props.handleUser(res.data);
      //Push to next site
      this.props.history.push("/dashboard/your-plants");
    });
  };

  render() {
    if (this.state.isLoading) {
      return (
        <div className="loading_block">
          <Header user={this.props.user} />
          <h1> Loading... </h1>
        </div>
      );
    }
    return (
      <div className="homepage">
        <div className="homepage_left">
          <Header user={this.props.user} />

          <div className="form">
            <div className="title_block">
              <h1> delete your plant </h1>
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

            <h3> Species plant</h3>
            <p> {this.state.plant}</p>
            <br />

            <h3> Nickname plant</h3>
            <p> {this.state.nickname}</p>
            <br />

            <h3> Room </h3>
            <p> {this.state.room}</p>
            <br />

            <h3> Extra notes about the plant </h3>
            <p> {this.state.notes}</p>

            <br />
            <br />

            <div className="warning">
              <h3 style={{ color: "rgb(170,138,75" }}>
                {" "}
                Are you sure you want to delete this plant?
              </h3>
            </div>

            <div className="deletePlant">
              <button className="btn_gb" onClick={this.handleClick}>
                {" "}
                Yes{" "}
              </button>
              <button
                className="btn_gb"
                onClick={() => this.props.history.goBack()}
              >
                {" "}
                No{" "}
              </button>
            </div>
          </div>
        </div>
        <div className="homepage_right"></div>
      </div>
    );
  }
}
