import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'

import axios from 'axios'
import {
    addToWishlist,
    removeFromWishlist,
    addToPlantsHome,
    removePlantHome
} from '../../services/auth';

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

        if(this.state.isLoading){
            return (
                <div>
                    <h2> Loading ...</h2>
                </div>
            )
        }

        const buttonValues = this.updateButtons(plant._id, user);
        // console.log("BUTONSVALUES", buttonValues)

        return (
            <div className='PlantPage'>
                {/* Button GO BACK */}
                <button onClick={() => this.props.history.goBack()}> Go back </button>

                {/* Card */}
                <div>
                    <img style={{ height: '500px' }} src={plant.pictures[0]} alt={plant.latinName} />
                </div>

                <h1>{plant.latinName}</h1>
                <h3>About this plant:</h3>
                <p> {plant.about}</p>
                <p> <b> Average height: </b> {plant.averageHeight} </p>
                <p> <b> Water: </b> {plant.water} </p>
                <p> <b> Light: </b> {plant.light} </p>
                <p> <b> Water: </b> {plant.water} </p>
                <p> <b> Air purifier: </b> {`${plant.strongAirPurifier}`} </p>
                <p> <b> Safe for pets: </b> {`${plant.toxicForPets}`} </p>

                {/* FavoriteButton */}
                {user && ( buttonValues.hasFavPlant &&
                    <button onClick={this.handleClick}> Remove from wislist </button> ||
                    <button onClick={this.handleClick}> Add to wislist! </button> ) ||
                    <button onClick={this.handleClick}> Add to wislist new user </button> }
                <br />

                {/* Have this at home - button */}
                {user && ( buttonValues.hasHousePlant &&
                    <button onClick={this.handleDeletePlant}> This plant is no longer in my home </button> ||
                    <button onClick={this.handleClickHomePlant}> Have this plant at home! </button> ) ||
                    <button onClick={this.handleClickHomePlant}> Have this plant at home new user! </button>}
                {this.state.deleteMessage &&
                    <div className="deletePlant">
                        <p>Are you sure you want to delete this plant? </p>
                        <Link to='/dashboard/your-plants'> Yes </Link>
                    </div>}
            </div> 
        )
    }
}

