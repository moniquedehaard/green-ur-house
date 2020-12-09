import React, { Component } from 'react'
import PlantCardSmall from '../components/PlantCardSmal';
import data from '../plants.json'
import './styling.css'

export default class PlantPage extends Component {
    // Needed, call to db where you give all plants
    
    render() {
        const plantData = data;
        console.log(plantData)
        return (
            <div className= 'plantPage'>
                <h1>This is the plant page with all plants</h1>
                
                {/* Search bar needed */}

                {/*  Plant block with all plants */}
                <div className="plantBlock">
                    {plantData.map(el => {
                        return <PlantCardSmall key={el._id} plant={el} />
                    })}
                </div>

            </div>
        )
    }
}
