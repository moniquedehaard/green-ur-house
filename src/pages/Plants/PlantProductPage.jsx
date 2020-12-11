import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import axios from 'axios'
import { addToWishlist, removeFromWishlist } from '../../services/auth';

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
        user: this.props.user,
        hasFavPlant: null
    }

    componentDidMount = () => {
        plantService.get(`/${this.props.match.params.id}`)
            .then(res => {
                //console.log('Response from api', res)
                if (this.state.user) {
                    const fav = this.state.user.favoritePlants.find(el => el === res.data._id) ? true : false;
                    console.log('updated')
                    this.setState({
                        plant: res.data,
                        isLoading: false,
                        hasFavPlant: fav
                    })
                } else {
                    this.setState({
                        plant: res.data,
                        isLoading: false,
                        hasFavPlant: false
                    })
                }
            })
    }

    handleClick = (event) => {
        // user should be logged in/ create account
        if (!this.state.user) {
            this.props.history.push("/auth/login");
        }

        // Clicked on remove from wishlist
        if (this.state.user && this.state.hasFavPlant) {
            // Remove from db
            console.log('hi from removing')
            removeFromWishlist(this.state.user._id, this.props.match.params.id)
            .then(res => {
                this.setState({
                    user: res.updatedUser,
                    hasFavPlant: false
                }) 
            }).catch(err => console.log('ERROR FROM REMOVING WISHLIST',err))
        }

        // Clicked on add to wishlist
        if (this.state.user && !this.state.hasFavPlant) {
            // Add to db
            addToWishlist(this.state.user._id, this.props.match.params.id)
            .then(res => {
                this.setState({
                    user: res.updatedUser,
                    hasFavPlant: true
                })
            })
            .catch(err => console.log("there has been an error", err))
        }
    }

    goBack() {
        console.log('GO BACK')
        const a = this.props.match.params.id
    }

    render() {
        const { plant, user } = this.state
        // console.log("User", user)
        // console.log("fav", this.state.hasFavPlant)
        console.log(this.props)

        if(this.state.isLoading){
            return (
                <div>
                    <h2> Loading ...</h2>
                </div>
            )
        }

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

                {user && ( this.state.hasFavPlant &&
                    <button onClick={this.handleClick}> Remove from wislist </button> ||
                    <button onClick={this.handleClick}> Add to wislist! </button> ) ||
                    <button onClick={this.handleClick}> Add to wislist new user </button> }
                <br />
                <Link to="/"> Have this plant </Link>
                 
            </div> 
        )
    }
}

