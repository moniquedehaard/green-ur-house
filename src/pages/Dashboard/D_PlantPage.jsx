import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { getAllHomePlantsOfUser } from "../../services/homePlants" 

export default class Dashboard_PlantPage extends Component {
    state = {
        homePlants: {},
        isLoading: true
    }

    componentDidMount = () => {
        const { user } = this.props
        getAllHomePlantsOfUser(user._id)
            .then(res => {
                // console.log("Response from api", res.plantsAtHome)
                this.setState({
                    homePlants: res.plantsAtHome,
                    isLoading:  false
                })
        })
    }

    render() {
        // console.log(this.state.homePlants)
        if (this.state.isLoading) {
            return <h1>Loading</h1>
        }

        return (
            <div>
                <h1> Here you can find your plants</h1>
                <Link to='/dashboard'> Go Back </Link>

                <div className='card'>
                    {this.state.homePlants.map(el => {
                        return (
                            <div key={el._id}>
                                <img style={{height:"300px"}} src={el.species.pictures[0]} alt={el.species.latinName}/>
                                <h2>Nickname:  {el.nickname}</h2>
                                <h3>Species: {el.species.latinName}</h3>
                            </div>
                        )
                    })}

                </div>
            </div>
        )
    }
}
