import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { getAllHomePlantsOfUser } from "../../services/homePlants" 
import Header from '../../components/Header/Header';

import "../styling.css"

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
                    <h1> your plants </h1>
                    <br/>
                    <button onClick={() => this.props.history.push('/dashboard')} className="btn_gb"> go back </button>
                    

                    <div className='card'>
                    {this.state.homePlants.map(el => {
                        return (
                            <div key={el._id} style={{height:"500px", width:"500px", border:"2px green solid", margin:"20px"}}>
                                <img style={{height:"300px"}} src={el.species.pictures[0]} alt={el.species.latinName}/>
                                <h2>Nickname:  {el.nickname}</h2>
                                <h3>Species: {el.species.latinName}</h3>
                                <Link to={`/your-plants/edit/${el._id}`}> Edit </Link>
                                <br />
                                <br/>
                                <Link to={`/your-plants/delete/${el._id}`}> Delete </Link>
                            </div>
                        )
                    })}
                    </div>
                     <Link to='/your-plants/create'> Add a new plant to your home</Link>
                </div>      
            </div>
        )
    }
}
