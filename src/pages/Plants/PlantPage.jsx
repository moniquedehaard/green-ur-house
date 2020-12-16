import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Header from '../../components/Header/Header';

import PlantCardSmall from "../../components/PlantCardSmall/PlantCardSmall"
import SearchBar from "../../components/Searchbar/SearchBar"

import { getAllPlants } from '../../services/plants';
import {
    addToWishlist,
    removeFromWishlist,
    populateUserInformation
} from '../../services/auth';

import "../styling.css"

export default class PlantPage extends Component {
    state = {
        user: this.props.user,
        plants: {},
        search: '',
        isLoading: true,
        // user: null
    }

    componentDidMount = () => {
        getAllPlants().then(responseBack => {
            if (this.props.user) {

                populateUserInformation(this.props.user._id).then(foundUser => {
                    console.log('USER FROM DB', foundUser)
                    this.setState({
                        plants: responseBack,
                        isLoading: false,
                        user: foundUser.foundUser
                    })
                })
            }
            
            this.setState({
                plants: responseBack,
                isLoading: false
            })
        })
    }

    handleChange = (event) => {
        const { name, value } = event.target
        this.setState({
            [name]:value
        })
    }

    // Click on wishlist
    handleClick = (event) => {
        const { user } = this.props

        if (!user) {
            this.props.history.push("/auth/login")
        }

        if (user) {
            // Find if favorite is in user array
            const fav = user.favoritePlants.find(el => el === event.target.id) ? true : false;

            if (fav) {
                // Remove from db
                removeFromWishlist(user._id, event.target.id)
                    .then(res => {
                        this.props.handleUser(res.updatedUser)
                    }).catch(err => console.log('ERROR FROM REMOVING WISHLIST', err))
            }
            // Clicked on add to wishlist
            if (!fav) {
                // Add to db
                addToWishlist(user._id, event.target.id)
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
            const home = user.homePlants.find(el => el.species === event.target.id) ? true : false;
            
            // Users delete plants from home
            if (home) {
                //--> GET NOTIFICATION DO YOU REALLY WANT TO DELETE THIS PLANT
                const numberOfPlants = user.homePlants.filter(el => el.species === event.target.id)
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
                const plant = this.state.plants.filter(el => el._id === event.target.id)
                this.props.history.push({ pathname: '/your-plants/create', plant: plant[0].latinName });
            }

        }
    }

    updateButtons(plants) {
        const resultsButtons = {}

        if (!this.props.user) {
            // console.log('no user prop')
            plants.forEach(plant => {
                resultsButtons[plant._id] = { hasFavPlant: false, hasHousePlant: false }
            })
        } else if (!this.state.user) {
            // console.log('no state user')
            plants.forEach(plant => {
                resultsButtons[plant._id] = { hasFavPlant: false, hasHousePlant: false }
            })
        } else {
            plants.forEach(plant => {
                // console.log('user logged in')
                const fav = this.props.user.favoritePlants.find(el => el === plant._id) ? true : false;
                const home = this.state.user.homePlants.find(el => el.species === plant._id) ? true : false;
                resultsButtons[plant._id] = { hasFavPlant: fav, hasHousePlant: home }
            })
        }
        return  resultsButtons
    }
    
    render() {
        // console.log('USERS FROM PLANTS PAGE', this.state.user)
        const { user } = this.props
        // console.log('Plants', this.state.plants)
        if (this.state.isLoading) {
            return (
                <div className="loading_block">
                    <Header user={this.props.user} />
                    <h1> Loading... </h1>
                </div>   
            )
        }

        const filteredPlants = this.state.plants.filter(el => {
            return el.latinName.toLowerCase().includes(this.state.search.toLowerCase())
        })

        const buttonValues = this.updateButtons(filteredPlants);
        // console.log(buttonValues)

        return (
            <div className='plantPage'>
                <Header user={this.props.user} />

                <div className="plantpage_content_block">
                    <h1> all houseplants </h1>

                    {/* Search bar needed */}
                    <SearchBar search={this.state.search} handleChange={this.handleChange}/>

                    {/*  Plant block with all plants */}
                    <div className="plantBlock">
                        {filteredPlants.map(el => {
                            {/* return <PlantCardSmall key={el._id} plant={el} /> */ }
                            return (
                                <div className="test" key={el._id}>
                                    <div className="plantImage">
                                        {/* <img className="plant_pic" src={el.pictures[0]} alt={el.latinName}/> */}
                                    </div>

                                    {/* <button onClick={() => console.log('add your  plant to fav card')} className="btn_gb"> fav </button> */}
                                    {/* <button onClick={() => console.log('add to homeplant card')} className="btn_gb"> homeplant yes</button> */}
                                    
                                    {/* Favorite plant */}
                                    {user && ( buttonValues[el._id].hasFavPlant &&
                                    <button onClick={this.handleClick} className="btn_gb" id={el._id}> Remove from wislist </button> ||
                                    <button onClick={this.handleClick} className="btn_gb" id={el._id}> Add to wislist! </button> ) ||
                                    <button onClick={this.handleClick} className="btn_gb" id={el._id}> Add to wislist new user </button>}
                                    
                                    {/* Have this  plant at home */}
                                    {user && ( buttonValues[el._id].hasHousePlant &&
                                    <button onClick={this.handleClickHomePlant} className="btn_gb" id={el._id}> This plant is no longer in my home </button> ||
                                    <button onClick={this.handleClickHomePlant} className="btn_gb" id={el._id}> Have this plant at home! </button> ) ||
                                    <button onClick={this.handleClickHomePlant} className="btn_gb" id={el._id}> Have this plant at home new user! </button>}
                                    
                                    <div className="text_block">
                                        <h2> {el.latinName} </h2> 
                                        <Link to={`/plants/${el._id}`} className='LinkButton'> Learn more </Link>
                                    </div>   

                                </div>
                            )
                        })}
                    </div>      

                </div>

            </div>
        )
    }
}
