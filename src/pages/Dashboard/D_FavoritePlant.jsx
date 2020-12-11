import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { populateUserInformation } from '../../services/auth'
import PlantCardSmall from "../../components/PlantCardSmal"

export default class D_FavoritePlant extends Component {
    state = {
        favPlants: {},
        isLoading: true
    }

    componentDidMount = () => {
        const { user } = this.props
        // auth service that populates favoritePlants
        populateUserInformation(user._id)
            .then(res => {
                console.log("Response from api", res.foundUser.favoritePlants)
                this.setState({
                    favPlants: res.foundUser.favoritePlants,
                    isLoading: false
                })
            })
    }


    render() {
        const { favPlants} = this.state
        
        if (this.state.isLoading) {
            return <h1>Loading</h1>
        }
        return (
            <div>
                <h1> Your favorite plants</h1>   
                <Link to='/dashboard'> Go Back </Link>


                {/* PlantCard */}
                <div className="plantBlock">
                    {favPlants.map(el => {
                        return <PlantCardSmall key={el._id} plant={el} />
                    })}
                </div>
            </div>
        )
    }
}
