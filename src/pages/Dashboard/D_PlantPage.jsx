import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Dashboard_PlantPage extends Component {
    render() {
        console.log(this.props)
        return (
            <div>
                <h1> Here you can find your plants</h1>
                <Link to='/dashboard'> Go Back </Link>
            </div>
        )
    }
}
