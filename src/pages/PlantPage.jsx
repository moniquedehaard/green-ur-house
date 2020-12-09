import React, { Component } from 'react'
import PlantCardSmall from '../components/PlantCardSmal';
import data from '../plants.json'

export default class PlantPage extends Component {
    // Needed, call to db where you give all plants
    
    render() {
        const plantData = data;
        console.log(plantData)
        return (
            <div>
                <h1>This is the plant page with all plants</h1>
                <div className="plant-block">
                    {plantData.map(el => {
                        return <PlantCardSmall key={el._id} plant={el} />
                    })}
                </div>

            </div>
        )
    }
}
