import React from 'react'
import { Link } from 'react-router-dom'

const PlantCardSmall = (props) => {
    console.log(props)
    const {latin_name, pictures, _id} = props.plant
    return (
        <div className="plantCard-small">
            <div>
                <img style={{ height:"300px"}}src={pictures[0]} alt={latin_name}/>
            </div>
            <h2> {latin_name} </h2> 
            <Link className='LinkButton' to={`/plants/${_id}`}> Learn more </Link>
        </div>
    )
}

export default PlantCardSmall
