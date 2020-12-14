import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { populateUserInformation } from '../../services/auth'
import PlantCardSmall from "../../components/PlantCardSmall/PlantCardSmall"
import Header from '../../components/Header/Header';
import "../styling.css"

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
            return (
                <div className="loading_block">
                    <Header user={this.props.user} />
                    <h1> Loading... </h1>
                </div>
                
            )
        }

        return (
            <div className="dashboard">
                <Header user={this.props.user} />
                
                <div className="dashboard_content">
                    <h1> your wishlist </h1>
                    <br/>
                    <button onClick={() => this.props.history.push('/dashboard')} className="btn_gb"> go back </button>
                    

                    {/* PlantCard */}
                    <div className="plantBlock">
                        {favPlants.map(el => {
                            return <PlantCardSmall key={el._id} plant={el} />
                        })}
                    </div>

                    <Link to='/plants'> Add new favorite plants </Link>
                </div> 

            </div>
        )
    }
}
