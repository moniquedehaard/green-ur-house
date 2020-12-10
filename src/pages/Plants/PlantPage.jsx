import React, { Component } from 'react'

import PlantCardSmall from '../../components/PlantCardSmal';
import SearchBar from "../../components/Searchbar/SearchBar"

import { getAllPlants } from '../../services/plants';
import "../styling.css"

export default class PlantPage extends Component {
    state = {
        plants: {},
        search: '',
        isLoading: true
    }


    componentDidMount = () => {
        // Make call to db!!!!
        // const plantData = data;
        // this.setState({
        //     plants: plantData,
        //     isLoading: false
        // })
        getAllPlants().then(responseBack => {
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
        
    
    render() {
        console.log('Plants', this.state.plants)
        if (this.state.isLoading) {
            return (
                <h1> Loading </h1>
            )
        }

        const filteredPlants = this.state.plants.filter(el => {
            return el.latinName.toLowerCase().includes(this.state.search.toLowerCase())
        })

        return (
            <div className= 'plantPage'>
                <h1>This is the plant page with all plants</h1>

                {/* Search bar needed */}
                {/* const { search, handleChange } = props */}
                <SearchBar search={this.state.search} handleChange={this.handleChange}/>

                {/*  Plant block with all plants */}
                <div className="plantBlock">
                    {filteredPlants.map(el => {
                        return <PlantCardSmall key={el._id} plant={el} />
                    })}
                </div>

            </div>
        )
    }
}
