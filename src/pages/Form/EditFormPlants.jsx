import React, { Component } from 'react'

import { getHomePlantById, updateHomePlant } from '../../services/homePlants'

export default class EditFormPlants extends Component {
    state = {
        plant:"",
        nickname: "",
        room: "",
        notes: "",
    }

    componentDidMount = () => {
        getHomePlantById(this.props.computedMatch.params.id).then(res => {
            // console.log(res.foundPlant)

            this.setState({
                plant: res.foundPlant.species.latinName,
                nickname: res.foundPlant.nickname,
                room: res.foundPlant.room,
                notes: res.foundPlant.notes
            })
        })
    }

// Submit plant form -> go to favorite plants
    handleSubmit = (event) => {
        event.preventDefault();
        const plant = {
            plant: this.state.plant,
            nickname: this.state.nickname,
            room: this.state.room,
            notes: this.state.notes
        }

        updateHomePlant(plant).then(res => {
            console.log('Updating new plant', res)
            if (!res.status) {
                return (
                    <div className='ErrorMessage'>
                        <h1> Oops, something went wrong! Go to the homepage! </h1>
                        <Link to='/'> Go to homepage </Link>
                    </div>    
                )
            }

            // Update user in app.js
            this.props.handleUser(res.data)
            // Push to next site 
            this.props.history.push("/dashboard/your-plants") 
        })  
    }


    handleChange = (event) => {
        this.setState({
          [event.target.name]: event.target.value,
        });
    };

    render() {
        // console.log(this.props)
        return (
            <div>
                <h1>Edit your plant</h1>
                <br />
                <button onClick={() => this.props.history.goBack()}> Go back </button>

                <br />
                <br/>

                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="plant">Species plant
                         <br/>
                        <select id="plant" name="plant" value={this.state.plant} onChange={this.handleChange}>
                            <option value="Monstera Delicioasa" > Monstera Delicioasa</option>
                            <option value="Calathea"> Calathea</option>
                            <option value="Alocasia Zebrina"> Alocasia Zebrina</option>
                            <option value="Ficus Lyrata"> Ficus Lyrata</option>
                            <option value="Pilea Peperomioides">Pilea Peperomioides</option>
                        </select>
                    </label>
                        
                    <br />
                    <br/>
                    <label htmlFor="nickname"> Nickname plant</label>
                    <br/>
                    <input
                        type="text"
                        id="nickname"
                        name="nickname"
                        value={this.state.nickname}
                        onChange={this.handleChange}
                        placeholder="Nickname plant"
                    />
                    <br />
                    <br/>
                    <label htmlFor="room">Room</label>
                    <br/>
                    {/* <input
                        type="text"
                        id="room"
                        name="room"
                        value={this.state.room}
                        onChange={this.handleChange}
                        placeholder="In which room does this plant belong?"
                    />  */}
                    <select id="room" name="room" value={this.state.room} onChange={this.handleChange}>
                        <option value="Unknown" > Choose here your room</option>
                        <option value="Living room" > Living room</option>
                        <option value="Kitchen"> Kitchen </option>
                        <option value="Dining room"> Dining room </option>
                        <option value="Bedroom"> Bedroom</option>
                        <option value="Bathroom">Bathroom</option>
                        <option value="Garden">Garden</option>
                        <option value="Toilet">Toilet</option>
                        <option value="Hall">Hall</option>
                        <option value="Hall">Else</option>
                        
                    </select>
                    <br />
                    <br/>
                    <label htmlFor="notes">Extra notes about the plant</label>
                    <br/>
                    {/* <input
                        type="text"
                        id="notes"
                        name="notes"
                        value={this.state.notes}
                        onChange={this.handleChange}
                        placeholder="Notes about the plant"
                    /> */}
                    <textarea
                        name="notes"
                        id="notes"
                        value={this.state.notes}
                        onChange={this.handleChange}
                        cols="30"
                        rows="8"
                        placeholder="Extra notes"></textarea>
                    <br />
                    <br/>
                   <button type="submit"> Add this plant to your collection </button> 
                </form>
            </div>
        )
    }
}
