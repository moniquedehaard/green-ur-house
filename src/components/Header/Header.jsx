import React, { Component } from 'react'
import { Link }from 'react-router-dom'

import './Header.css'

export default class Header extends Component {
    
    render() {
        if (!this.props.user) {
            return (
                <div className="header">
                    <Link to="/" className="linkHeader title"> green(ur)house </Link>
                    <div className="links">
                        <Link className="linkHeader" to="/plants"> see all plants </Link>
                        <Link className="linkHeader" to="/auth/login"> login </Link>
                        <Link className="linkHeader" to="/auth/signup"> sign up </Link>
                    </div>
                </div>
            )
        }

        return (
                <div className="header">
                <Link to="/" className="linkHeader title"> green(ur)house </Link>
                
                    {/* <div className="links">
                        <Link className="linkHeader" to="/plants"> see all plants </Link>
                    </div> */}
                </div>
                
            )
    }
}
