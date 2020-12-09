import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import data from '../plants.json'

// Do call to database
// Select id
// Show right data

export default class PlantProductPage extends Component {
    state = {
        plant: {},
        isLoading: true
    }

    componentDidMount = () => {
        const plantFromDb = data.find(el => el._id == this.props.match.params.id);

        this.setState({
            plant: plantFromDb,
            isLoading: false
        })
    }
    

    render() {
        console.log('props', this.props)
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
                    <img style={{ height: '500px' }} src={plant.pictures[0]} alt={plant.latin_name} />
                </div>

                <h1>{plant.latin_name}</h1>
                <h3>About this plant:</h3>
                <p> {plant.about}</p>
                <p> <b> Average height: </b> {plant.average_height} </p>
                <p> <b> Water: </b> {plant.water} </p>
                <p> <b> Light: </b> {plant.light} </p>
                <p> <b> Water: </b> {plant.water} </p>
                <p> <b> Air purifier: </b> {plant.air_purifier} </p>
                <p> <b> Safe for pets: </b> {plant.pets} </p>
                
                <Link> Have this </Link>
                <br/>
                <Link> Add to wishlist </Link>


                
            </div>
        )
    }
}

