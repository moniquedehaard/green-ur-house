import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import axios from 'axios'
import { addToWishlist } from '../../services/auth';

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
        hasFavPlant: false
    }

    componentDidMount = () => {
        plantService.get(`/${this.props.match.params.id}`)
            .then(res => {
                //console.log('Response from api', res)
                let fav = false;
                if (this.state.user) {
                    fav = this.state.user.favoritePlants.find(el => el === res.data._id) ? true : false;
                }

                this.setState({
                    plant: res.data,
                    isLoading: false,
                    hasFavPlant: fav
                })
            })
    }

    handleClickFav = (event) => {
        // user should be logged in/ create account
        if (!this.state.user) {
            this.props.history.push("/auth/login");
        }

        // Clicked on remove from wishlist
        if (this.state.hasFavPlant) {
            // Remove from db
        }

        // Clicked on add to wishlist
        if (!this.state.hasFavPlant) {
            // Add to db
            console.log('hi')
            addToWishlist(this.state.user._id, this.props.match.params.id)
            .then(res => {
                this.setState({
                    user: res.updatedUser,
                    hasFavPlant: true
                })
            })
            .catch(err => console.log("there has been an error"))
        }
            

        // authService.put(`wishlist/${this.props.match.params.id}`)
    }

//      handleSubmit = (event) => {
//     event.preventDefault();
//     updateSingleQuestion(this.props.match.params.id, this.state.question).then(
//       (res) => {
//         if (!res.status) {
//           //  deal with the error
//           return;
//         }
//         console.log("res:", res);
//         this.props.history.push("/");
//         //  was successful
//       }
//     );
//   };
    

    render() {
        const { plant, user } = this.state
        console.log('User from state', this.state.user)
        console.log('Favwwwwww', this.state.hasFavPlant)
        if(this.state.isLoading){
            return (
                <div>
                    <h2> Loading ...</h2>
                </div>
            )
        }

        return (
            <div className='PlantPage'>
                <Link to='/plants'> Go back </Link>
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
                
                { user &&
                    this.state.hasFavPlant &&
                    (<button onClick={this.handleClickFav}> Remove from wislist </button>
                    || <button onClick={this.handleClickFav}> Add to wislist </button> )
                 || ( <button onClick={this.handleClickFav}> Add to wislist new user </button> )
                }

                {/* {user && (this.)} */}
               
                <br/>
                <Link to="/"> Have this plant </Link>
                 
            </div> 
        )
    }
}

