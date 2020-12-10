import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import axios from 'axios'

// Do call to database
// Select id
// Show right data
const plantService = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}/plants`,
});

export default class PlantProductPage extends Component {
    state = {
        plant: {},
        isLoading: true
    }

    componentDidMount = () => {
        // Old way
        // const plantFromDb = data.find(el => el._id == this.props.match.params.id);
        // this.setState({
        //     plant: plantFromDb,
        //     isLoading: false
        // })

        plantService.get(`/${this.props.match.params.id}`)
            .then(res => {
                //console.log('Response from api', res)
                this.setState({
                    plant: res.data,
                    isLoading: false
                })
            })
    }
    

    render() {
        const { plant } = this.state
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
                
                <Link to="/"> Have this </Link>
                <br/>
                <Link to="/"> Add to wishlist </Link>
            </div>
        )
    }
}

