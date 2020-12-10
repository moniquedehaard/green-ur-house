import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class D_FavoritePlant extends Component {
    render() {
        return (
            <div>
                <h1> Your favorite plants</h1>   
                <Link to='/dashboard'> Go Back </Link>
            </div>
        )
    }
}
