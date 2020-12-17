import React, { Component } from "react";
import Header from "../../components/Header/Header";
import { getHomePlantById, updateHomePlant } from "../../services/homePlants";
import "../styling.css";

export default class EditFormPlants extends Component {
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

  // Submit plant form -> go to favorite plants
  handleSubmit = (event) => {
    event.preventDefault();
    const plant = {
      plant: this.state.plant,
      nickname: this.state.nickname,
      room: this.state.room,
      notes: this.state.notes,
    };

    updateHomePlant(this.props.computedMatch.params.id, plant).then((res) => {
      console.log("Updating new plant", res);
      if (!res.status) {
        return (
          <div className="ErrorMessage">
            <h1> Oops, something went wrong! Go to the homepage! </h1>
            <Link to="/"> Go to homepage </Link>
          </div>
        );
      }
      // Update user in app.js
      this.props.handleUser(res.data);
      // Push to next site
      this.props.history.push("/dashboard/your-plants");
    });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    // console.log(this.props)
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
              <h1> edit your plant </h1>
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

            {/* Start form */}
            <form className="plant_form" onSubmit={this.handleSubmit}>
              <label htmlFor="plant">
                Species plant
                <br />
                <select
                  className="select_form"
                  id="plant"
                  name="plant"
                  value={this.state.plant}
                  onChange={this.handleChange}
                >
                  <option value="Monstera Delicioasa">
                    {" "}
                    Monstera Delicioasa
                  </option>
                  <option value="Calathea Orbifolia">Calathea Orbifolia</option>
                  <option value="Alocasia Zebrina"> Alocasia Zebrina </option>
                  <option value="Ficus Lyrata"> Ficus Lyrata </option>
                  <option value="Pilea Peperomioides">
                    Pilea Peperomioides
                  </option>
                  <option value="Pilea Peperomioides">
                    Pilea Peperomioides
                  </option>
                  <option value="Strelitzia Nicolai">Strelitzia Nicolai</option>
                  <option value="Musa Dwarf Cavendisch">
                    Musa Dwarf Cavendisch
                  </option>
                  <option value="Zamioculcas"> Zamioculcas </option>
                  <option value="Coffea Arabica">Coffea Arabica</option>
                  <option value="Sansevieria Laurentii">
                    Sansevieria Laurentii
                  </option>
                  <option value="Phlebodium"> Phlebodium </option>
                  <option value="Phalaenopsis Asian Pearl">
                    Phalaenopsis Asian Pearl
                  </option>
                  <option value="Chlorophytum"> Chlorophytum </option>
                  <option value="Yucca Elephantipes">Yucca Elephantipes</option>
                </select>
              </label>

              <br />
              <br />

              <label htmlFor="nickname"> Nickname plant</label>
              <br />
              <input
                className="plantForm-input"
                type="text"
                id="nickname"
                name="nickname"
                value={this.state.nickname}
                onChange={this.handleChange}
                placeholder="Nickname plant"
              />
              <br />
              <br />
              <label htmlFor="room">Room</label>
              <br />

              <select
                id="room"
                name="room"
                value={this.state.room}
                onChange={this.handleChange}
              >
                <option value="Unknown"> Choose here your room</option>
                <option value="Living room"> Living room</option>
                <option value="Kitchen"> Kitchen </option>
                <option value="Dining room"> Dining room </option>
                <option value="Bedroom"> Bedroom</option>
                <option value="Bathroom">Bathroom</option>
                <option value="Garden">Garden</option>
                <option value="Toilet">Toilet</option>
                <option value="Hall">Hall</option>
                <option value="Else">Else</option>
              </select>

              <br />
              <br />

              <label htmlFor="notes">Extra notes about the plant</label>
              <br />
              <textarea
                className="plantForm-input"
                name="notes"
                id="notes"
                value={this.state.notes}
                onChange={this.handleChange}
                cols="30"
                rows="8"
                placeholder="Extra notes"
              ></textarea>
              <br />
              <br />

              <button className="btn_gb" type="submit">
                {" "}
                Submit{" "}
              </button>
            </form>
          </div>
        </div>
        <div className="homepage_right"></div>
      </div>
    );
  }
}
