import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Header from '../../components/Header/Header';

export default class D_Account extends Component {
    state = {
        
    }
    render() {
        // if (this.state.isLoading) {
        //     return (
        //         <div className="loading_block">
        //             <Header user={this.props.user} />
        //             <h1> Loading... </h1>
        //         </div>
                
        //     )
        // }

        return (                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
            <div className="dashboard">
                <Header user={this.props.user} />

                <div className="dashboard_content">
                    <h1> your account </h1>

                    <br/>
                    <button onClick={() => this.props.history.push('/dashboard')} className="btn_gb"> go back </button>
                    

                    <h3> Username</h3>
                    <p> {this.props.user.username}</p>
                    <br/>

                    <h3> Image </h3>
                    <p> {this.props.user.profilePic}</p>

                    <br />
                    <Link to='/dashboard/account/edit'> Edit your account</Link>
                    <br/>
                    <Link to='/dashboard/account/edit-password'> Edit your password</Link>
                </div>
                
            </div>
        )
    }
}
