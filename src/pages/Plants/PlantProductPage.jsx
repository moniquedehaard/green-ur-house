import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'

import Header from '../../components/Header/Header';

import axios from 'axios'
import {
    addToWishlist,
    removeFromWishlist,
    addToPlantsHome,
    removePlantHome,
    populateUserInformation
} from '../../services/auth';

import "../styling.css"

// TO DO
// - Remove PlantService

const plantService = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}/plants`,
});

export default class PlantProductPage extends Component {
    state = {
        plant: {},
        isLoading: true,
        user: null
    }

    componentDidMount = () => {
        // Get plant of specific page
        plantService.get(`/${this.props.match.params.id}`).then(res => {
            // Check if user is logged in
            if (this.props.user) {
                // console.log('hi')
                populateUserInformation(this.props.user._id).then(foundUser => {
                    // console.log('User', foundUser)
                    this.setState({
                        plant: res.data,
                        isLoading: false,
                        user: foundUser.foundUser
                    })
                })
            }

            //  no user
            this.setState({
                plant: res.data,
                isLoading: false
            })
        })
    }

    // Click on wishlist
    handleClick = (event) => {
        const { user } = this.props

        // user should be logged in/ create account -> REDIRECT
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
                    }).catch(err => console.log('ERROR FROM REMOVING WISHLIST', err))
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
        const { user } = this.state
        // user should be logged in/create account
        if (!user) {
            this.props.history.push("/auth/login");
        }

        if (user) {
            // Find if favorite is in user home array
            const home = user.homePlants.find(el => el.species === this.props.match.params.id) ? true : false;
            
            // Users delete plants from home
            if (home) {
                //--> GET NOTIFICATION DO YOU REALLY WANT TO DELETE THIS PLANT
                const numberOfPlants = user.homePlants.filter(el => el.species === this.props.match.params.id)
                // console.log(numberOfPlants)
                if (numberOfPlants.length > 1) {
                   this.props.history.push("/dashboard/your-plants") 
                } else {
                    this.props.history.push(`/your-plants/delete/${numberOfPlants[0]._id}`)
                }
            }

            // User adds plant to home
            
            if (!home) {
                // --> THIS SHOULD GO TO THE FORM
                this.props.history.push({ pathname: '/your-plants/create', plant: this.state.plant.latinName });
            }

        }
    }
        

    updateButtons(plantId) {
        if (!this.props.user) {
            return {  hasFavPlant: false, hasHousePlant: false }
        }

        if (!this.state.user) {
            return { hasFavPlant: false, hasHousePlant: false}
        }
    
        const fav = this.props.user.favoritePlants.find(el => el === plantId) ? true : false;
        const home = this.state.user.homePlants.find(el => el.species === plantId) ? true : false;
        return {
            hasFavPlant: fav,
            hasHousePlant: home
        }
    }

    render() {
        const { plant } = this.state
        const { user } = this.props
        // console.log('USER FROM PROPS', user)
        // console.log('USER FROM STATE', this.state.user)

        if (this.state.isLoading) {
            return (
                <div className="loading_block">
                    <Header user={this.props.user} />
                    <h1> Loading... </h1>
                </div>
                
            )
        }
        
        const buttonValues = this.updateButtons(plant._id);

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
                                    {plant.strongAirPurifier ? <p> strong air purifier</p> : <p> medium/low air purifier</p>}
                                </div>

                                <div className="ppp_property">
                                    <div className="main-nav__icon_ppp">
                                        <i className="fas fa-cat"></i>
                                    </div>
                                    {plant.toxicForPets? <p> not safe for your pets</p> : <p> safe for your pet</p>}
                                </div>

                            </div>
                            
                        <div className="ppp_buttons">
                            {/* Favorite plant */}
                            {user && ( buttonValues.hasFavPlant &&
                            <button onClick={this.handleClick} className="btn_round" style={{marginTop:'20px' ,backgroundColor:"rgb(170,138,75)"}} > <i className="far fa-heart"></i> </button> ||
                            <button onClick={this.handleClick} className="btn_round" style={{marginTop:'20px'}}> <i className="far fa-heart"></i> </button> ) ||
                            <button onClick={this.handleClick} className="btn_round" style={{ marginTop: '20px' }}> <i className="far fa-heart"></i></button>}
                            
                            {/* Have this  plant at home */}
                            {user && ( buttonValues.hasHousePlant &&
                            <button onClick={this.handleClickHomePlant} className="btn_round" style={{marginTop:'20px' ,backgroundColor:"rgb(170,138,75)"}}> <i className="fas fa-leaf"></i> </button> ||
                            <button onClick={this.handleClickHomePlant} className="btn_round" style={{ marginTop: '20px' }}> <i className="fas fa-leaf"></i> </button> ) ||
                            <button onClick={this.handleClickHomePlant} className="btn_round" style={{ marginTop: '20px' }}><i className="fas fa-leaf"></i> </button>}
                        </div>
                        
                    </div>

                    {/* Button GO BACK */}
                    <div>
                        <button onClick={() => this.props.history.goBack()} className="btn_gb"> go back </button>

                        {/* <div className="like_block"></div> */}

                    </div>
                    
                    
                    </div>
                    
            </div> 
        )
    }
}

