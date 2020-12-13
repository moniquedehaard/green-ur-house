import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class D_Account extends Component {
    state = {
        
    }
    render() {
        return (                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
            <div>
                <h1> Your  profile</h1>

                <h3> Username</h3>
                <p> {this.props.user.username}</p>
                <br/>

                <h3> Image </h3>
                <p> {this.props.user.profilePic}</p>
                
                <br />
                <Link to='/dashboard/account/edit'> Edit your account</Link>
                <br/>
                <Link to='/dashboard/account/edit-password'> Edit your password</Link>
                <br/>
                <Link to='/dashboard'> Go Back </Link>
            </div>
        )
    }
}
