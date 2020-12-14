import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'

import Header from '../../components/Header/Header';

import axios from 'axios'
import {
    addToWishlist,
    removeFromWishlist,
    addToPlantsHome,
    removePlantHome
} from '../../services/auth';

import "../styling.css"

// TO DO
// - REMOVING HOME PLANTS  WHEN CLICK ON BUTTON (GET WARNING)
// - Remove PlantService


// Do call to database
// Select id
// Show right data


const plantService = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}/plants`,
});

const authService = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}/auth`,
});


export default class PlantProductPage extends Component {
    state = {
        plant: {},
        isLoading: true,
        deleteMessage: false
    }

    componentDidMount = () => {
        plantService.get(`/${this.props.match.params.id}`)
            .then(res => {
                //console.log('Response from api', res)
                this.setState({
                    plant: res.data,
                    isLoading: false
                }) 
            })
    }

    handleClick = (event) => {
        const { user } = this.props
        // user should be logged in/ create account
        if (!user) {
           this.props.history.push("/auth/login");
        }

        if (user) {
            // Find if favorite is in user favorite array
            const fav = user.favoritePlants.find(el => el === this.props.match.params.id) ? true : false;

            // Clicked on remove from wishlist
            if (fav) {
                // Remove from db
                removeFromWishlist(user._id, this.props.match.params.id)
                    .then(res => {
                        this.props.handleUser(res.updatedUser)
                }).catch(err => console.log('ERROR FROM REMOVING WISHLIST',err))
            }

            // Clicked on add to wishlist
            if (!fav) {
                // Add to db
                addToWishlist(user._id, this.props.match.params.id)
                    .then(res => {
                        this.props.handleUser(res.updatedUser)
                })
                .catch(err => console.log("there has been an error", err))
            }
        }
    }

    handleClickHomePlant = (event) => {
        const { user } = this.props
        // user should be logged in/create account
        if (!user) {
            this.props.history.push("/auth/login");
        }

        if (user) {
        // Find if favorite is in user home array
        const home = user.homePlants.find(el => el === this.props.match.params.id) ? true : false;

        // Users delete plants from home
        //--> GET NOTIFICATION DO YOU REALLY WANT TO DELETE THIS PLANT
        if (home) {
            this.props.history.push("/your-plants/remove")
            //removePlantHome(user._id, this.props.match.params.id)
            //.then(res => {
            //    this.props.handleUser(res.updatedUser)
            //}).catch(err => console.log('ERROR FROM REMOVING plant home',err))
        }

        // User adds plant to home
        // --> THIS SHOULD GO TO THE FORM
        if (!home) {
            //this.props.history.push("/your-plants/create") 
            this.props.history.push({ pathname: '/your-plants/create', plant:this.state.plant.latinName});
        }

        }
    }

    handleDeletePlant = (event) => {
        this.setState({
            deleteMessage: true
        })
    }
        

    updateButtons(plantId, user) {
        if (!user) {
            return {  hasFavPlant: false, hasHousePlant: false }
        }

        const fav = user.favoritePlants.find(el => el === plantId) ? true : false;
        const home = user.homePlants.find(el => el === plantId) ? true : false;
        return {
            hasFavPlant: fav,
            hasHousePlant: home
        }
        
    }

    render() {
        // console.log('Props', this.props)
        const { plant } = this.state
        const { user } = this.props
        // console.log('USER FROM PLANTPAGE', user)

        if (this.state.isLoading) {
            return (
                <div className="loading_block">
                    <Header user={this.props.user} />
                    <h1> Loading... </h1>
                </div>
                
            )
        }

        const buttonValues = this.updateButtons(plant._id, user);
        // console.log("BUTONSVALUES", buttonValues)

        return (
            <div className='plantProductPage'>
                <Header user={this.props.user} />
                
                <div className="ppp_title">
                    <h1> {plant.latinName.toLowerCase()} </h1>
                </div>
                
                <div className="ppp_plantcard">
                    
                    {/* Card */}
                    <div className="ppp_plantcard_img">
                        <img src={plant.pictures[0]} alt={plant.latinName} />
                    </div>

                    <div className="ppp_information">
                        <div className="ppp_names">
                            <h1>{plant.latinName}</h1>
                            <h4>or</h4>
                            <h1>{plant.name}</h1>
                        </div>
                        
                        <div className="ppp_about">
                            <h3>About this plant</h3>
                            <p> {plant.about}</p>
                        </div>   
                        
                        <div className="ppp_properties_block">
                                
                                <div className="ppp_property">
                                    <div className="main-nav__icon_ppp">
                                        <i className="fas fa-ruler-vertical"></i>
                                    </div>
                                    <p> {plant.averageHeight} </p>
                                </div>
                            
                                <div className="ppp_property">
                                    <div className="main-nav__icon_ppp">
                                        <i className="fas fa-tint"></i>
                                    </div>
                                    <p>{plant.water}</p>
                                </div>

                                <div className="ppp_property">
                                    <div className="main-nav__icon_ppp">
                                        <i className="fas fa-sun"></i>
                                    </div>
                                    <p>{plant.light}</p>
                                </div>

                                <div className="ppp_property">
                                    <div className="main-nav__icon_ppp">
                                        <i className="fas fa-wind"></i>
                                    </div>
                                    <p>{`${plant.strongAirPurifier}`}</p>
                                </div>

                                <div className="ppp_property">
                                    <div className="main-nav__icon_ppp">
                                        <i className="fas fa-cat"></i>
                                    </div>
                                    <p>{`${plant.toxicForPets}`}</p>
                                </div>

                            </div>
                            
                        <div className="ppp_buttons">
                            {/* Favorite plant */}
                            {user && ( buttonValues.hasFavPlant &&
                            <button onClick={this.handleClick} className="btn_ppp"> Remove from wislist </button> ||
                            <button onClick={this.handleClick} className="btn_ppp"> Add to wislist! </button> ) ||
                            <button onClick={this.handleClick} className="btn_ppp"> Add to wislist new user </button>}
                            

                            {/* Have this  plant at home */}
                            {user && ( buttonValues.hasHousePlant &&
                            <button onClick={this.handleDeletePlant} className="btn_ppp"> This plant is no longer in my home </button> ||
                            <button onClick={this.handleClickHomePlant} className="btn_ppp"> Have this plant at home! </button> ) ||
                            <button onClick={this.handleClickHomePlant} className="btn_ppp"> Have this plant at home new user! </button>}
                            
                            {/* Error message - deleting */}
                            {this.state.deleteMessage &&
                            <div className="deletePlant">
                                <p>Are you sure you want to delete this plant? </p>
                                <Link to='/dashboard/your-plants'> Yes </Link>
                            </div>}
                        </div>
                        
                    </div>

                    {/* Button GO BACK */}
                    <button onClick={() => this.props.history.goBack()} className="btn_gb"> go back </button>
                    
                    </div>
                    
            </div> 
        )
    }
}

