import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class D_Account extends Component {
    render() {
        return (
            <div>
                <h1> Here you can see your account and change</h1>
                <Link to='/dashboard'> Go Back </Link>
            </div>
        )
    }
}
