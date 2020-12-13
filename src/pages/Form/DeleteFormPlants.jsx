import React, { Component } from 'react'
import { getHomePlantById, deleteHomePlant } from '../../services/homePlants'
import { Link } from 'react-router-dom'
export default class DeleteFormPlants extends Component {
    state = {
        plant:"",
        nickname: "",
        room: "",
        notes: "",
        isLoading: true
    }

    componentDidMount = () => {
        getHomePlantById(this.props.computedMatch.params.id).then(res => {
            // console.log(res.foundPlant)

            this.setState({
                plant: res.foundPlant.species.latinName,
                nickname: res.foundPlant.nickname,
                room: res.foundPlant.room,
                notes: res.foundPlant.notes,
                isLoading: true
            })
        })
    }
    
    handleClick = (event) => {
        const plant = {
            plant: this.state.plant,
            nickname: this.state.nickname,
            room: this.state.room,
            notes: this.state.notes
        }

        deleteHomePlant(this.props.computedMatch.params.id, plant).then(res => {
                if (!res.status) {
                    return (
                        <div className='ErrorMessage'>
                            <h1> Oops, something went wrong! Go to the homepage! </h1>
                            <Link to='/'> Go to homepage </Link>
                        </div>    
                    )
                }
                //Update user in app.js
                this.props.handleUser(res.data)
                //Push to next site 
                this.props.history.push("/dashboard/your-plants") 
            })  
    };

    render() {
        if (this.state.isLoading) {
            <div className="isLoading">
                <h1>Loading </h1>
            </div>
        }

        return (

            <div>
                <h1>Delete your plant</h1>
                <br />
                <button onClick={() => this.props.history.goBack()}> Go back </button>

                <br />
                <br/>

                <h3> Species plant</h3>
                <p> {this.state.plant}</p>
                <br />

                <h3> Nickname plant</h3>
                <p> {this.state.nickname}</p>
                <br />
                
                <h3> Room </h3>
                <p> {this.state.room}</p>
                <br />
                
                <h3> Extra notes about the plant </h3>
                <p> {this.state.notes}</p>

                <br />
                <br />
                
                <h3 style={{ color:"red"}}> Are you sure you want to delete this plant?</h3>
                <button onClick={this.handleClick}> Yes </button>
                <br/>
                <button onClick={() => this.props.history.goBack()}> No </button>

            </div>
        )
    }
}

