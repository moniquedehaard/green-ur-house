import React from 'react'
import { Link } from 'react-router-dom'

const PlantCardSmall = (props) => {
    const {latinName, pictures, _id} = props.plant
    return (
        <div className="plantCard-small">
            <div>
                <img style={{ height:"300px"}}src={pictures[0]} alt={latinName}/>
            </div>
            <h2> {latinName} </h2> 
            <Link to={`/plants/${_id}`} className='LinkButton'> Learn more </Link>
        </div>
    )
}

export default PlantCardSmall
