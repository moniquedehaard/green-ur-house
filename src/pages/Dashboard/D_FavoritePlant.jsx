import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  populateUserInformation,
  removeFromWishlist,
} from "../../services/auth";
import PlantCardSmall from "../../components/PlantCardSmall/PlantCardSmall";
import Header from "../../components/Header/Header";
import "../styling.css";

export default class D_FavoritePlant extends Component {
  state = {
    favPlants: {},
    isLoading: true,
  };

  componentDidMount = () => {
    const { user } = this.props;
    // auth service that populates favoritePlants
    populateUserInformation(user._id).then((res) => {
      // array
      // console.log("Response from api", res.foundUser.favoritePlants);
      this.setState({
        favPlants: res.foundUser.favoritePlants,
        isLoading: false,
      });
    });
  };

  // Click on delete
  handleClick = (id) => {
    // event.preventDefault();
    const { user } = this.props;

    const updated = this.state.favPlants.filter((el) => el._id !== id);

    // Remove from db
    removeFromWishlist(this.props.user._id, id)
      .then((res) => {
        this.props.handleUser(res.updatedUser);
        this.setState({
          favPlants: updated,
        });
        // this.props.history.push('/dashboard/favorite-plants')
      })
      .catch((err) => console.log("ERROR FROM REMOVING WISHLIST", err));
  };

  render() {
    const { favPlants } = this.state;
    // console.log(favPlants);
    // console.log(this.props.user);
    if (this.state.isLoading) {
      return (
        <div className="loading_block">
          <Header user={this.props.user} />
          <h1> Loading... </h1>
        </div>
      );
    }

    return (
      <div className="dashboard">
        <Header user={this.props.user} />

        <div className="dashboard_content">
          <h1> your wishlist </h1>
          <br />
          <br />
          <button
            onClick={() => this.props.history.goBack()}
            className="btn_gb"
          >
            {" "}
            go back{" "}
          </button>

          <div className="block__cards">
            {/* Add a new plant */}
            <div className="card__homePlant">
              <div className="card_top">
                <div className="card_img">
                  <img src="/addFav.jpg" alt="test.jpg" />
                </div>

                <div className="card__buttonblock"></div>
              </div>

              <div className="card_bottom">
                <h3 style={{ color: "rgb(240, 242, 244)" }}> species </h3>
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    justifyContent: "space-between",
                  }}
                >
                  <h1 style={{ color: "rgb(240, 242, 244)" }}> n </h1>
                  <Link className="btn__link" to="/plants">
                    {" "}
                    Add new favs...
                  </Link>
                </div>
              </div>
            </div>

            {favPlants.map((el) => {
              return (
                <div key={el._id} className="card__homePlant">
                  <div className="card_top">
                    <div className="card_img">
                      <img src={el.pictures[0]} alt={el.latinName} />
                    </div>

                    <div className="card__buttonblock">
                      <button
                        onClick={() => this.handleClick(`${el._id}`)}
                        style={{ marginTop: "20px" }}
                        className="btn_round"
                      >
                        <i className="far fa-trash-alt"></i>
                      </button>
                    </div>
                  </div>

                  <div className="card_bottom">
                    <h3 style={{ fontSize: "32px", fontWeight: "600" }}>
                      {el.latinName}
                    </h3>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "baseline",
                        justifyContent: "space-between",
                      }}
                    >
                      <h2 style={{ color: "rgb(240, 242, 244)" }}> n </h2>
                      <Link className="btn__link" to={`/plants/${el._id}`}>
                        {" "}
                        Learn more...
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
