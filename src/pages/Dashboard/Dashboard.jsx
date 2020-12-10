import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Dashboard extends Component {
    render() {
        return (
            <div>
                <h1> Hello, this is your dashboard </h1>
                <h2> To do list </h2>
                <br/>
                <Link to='/dashboard/your-plants'> Your plants </Link>
                <br/>
                <Link to='/dashboard/favorite-plants'> Your favorite plants</Link>
                <br/>
                <Link to='/dashboard/account'> Your Account</Link>
            </div>
        )
    }
}
