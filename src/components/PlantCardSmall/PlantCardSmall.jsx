import React from 'react'
import { Link } from 'react-router-dom'

import "./PlantCardSmall.css"

const PlantCardSmall = (props) => {
    const {latinName, pictures, _id} = props.plant
    return (
        <div className="plantCard-small">
            <div className="top">
                <div className="plantImage">
                    <img className="plant_pic" src={pictures[0]} alt={latinName}/>
                </div>
            
                <div className="buttonblock">
                    <button onClick={()=> console.log('add to your plants')}>
                        <div className="main-nav__icon plantcard_button">
                            <i className="fas fa-leaf"></i>
                        </div>
                    </button>

                    <button onClick={()=> console.log('add to your wishlist')}>
                        <div className="main-nav__icon plantcard_button">
                            <i className="far fa-heart"></i>
                        </div>
                    </button>
                </div>
            </div>
            
            <div className="text_block">
                <h2> {latinName} </h2> 
                <Link to={`/plants/${_id}`} className='LinkButton'> Learn more </Link>
            </div>         
        </div>
    )
}

export default PlantCardSmall
