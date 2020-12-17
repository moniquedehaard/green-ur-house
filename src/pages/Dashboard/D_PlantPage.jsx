import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getAllHomePlantsOfUser } from "../../services/homePlants";
import Header from "../../components/Header/Header";

import "../styling.css";

export default class Dashboard_PlantPage extends Component {
  state = {
    homePlants: {},
    isLoading: true,
  };

  componentDidMount = () => {
    const { user } = this.props;
    getAllHomePlantsOfUser(user._id).then((res) => {
      // console.log("Response from api", res.plantsAtHome)
      this.setState({
        homePlants: res.plantsAtHome,
        isLoading: false,
      });
    });
  };

  render() {
    // console.log(this.state.homePlants)
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
          <h1> your plants </h1>
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
                  <img src="/addPlant.jpg" alt="test.jpg" />
                </div>

                <div className="card__buttonblock">
                  {/* <Link className="nav_linkHeader" to={`/your-plants/edit/${el._id}`}> 
                                            <div className="button_card">
                                                <i className="fas fa-pen"></i>
                                            </div>
                                        </Link>

                                        <Link className="nav_linkHeader" to={`/your-plants/delete/${el._id}`}> 
                                            <div className="button_card">
                                                <i className="far fa-trash-alt"></i>
                                            </div>
                                        </Link> */}
                </div>
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
                  <Link className="btn__link" to="/your-plants/create/">
                    {" "}
                    Add new plant to your home...
                  </Link>
                </div>
              </div>
            </div>

            {this.state.homePlants.map((el) => {
              return (
                <div key={el._id} className="card__homePlant">
                  <div className="card_top">
                    <div className="card_img">
                      <img
                        src={el.species.pictures[0]}
                        alt={el.species.latinName}
                      />
                    </div>

                    <div className="card__buttonblock">
                      <Link
                        className="nav_linkHeader"
                        to={`/your-plants/edit/${el._id}`}
                      >
                        <div className="button_card">
                          <i className="fas fa-pen"></i>
                        </div>
                      </Link>

                      <Link
                        className="nav_linkHeader"
                        to={`/your-plants/delete/${el._id}`}
                      >
                        <div className="button_card">
                          <i className="far fa-trash-alt"></i>
                        </div>
                      </Link>
                    </div>
                  </div>

                  <div className="card_bottom">
                    <h3>{el.species.latinName}</h3>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "baseline",
                        justifyContent: "space-between",
                      }}
                    >
                      {el.nickname !== "" && <h1>{el.nickname}</h1>}
                      {el.nickname === "" && (
                        <h1 style={{ color: "rgb(240, 242, 244)" }}> n </h1>
                      )}
                      <Link
                        className="btn__link"
                        to={`/plants/${el.species._id}`}
                      >
                        {" "}
                        Read more...
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
