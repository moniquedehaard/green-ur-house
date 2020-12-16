import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Header from '../../components/Header/Header';

import "../styling.css"

export default class Dashboard extends Component {
    render() {
        return (
            <div className="dashboard">
                <Header user={this.props.user} />
                
                <div className="dashboard_content">
                    <h1> to do </h1>
                </div>
            </div>
        )
    }
}
