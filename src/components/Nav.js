import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
                <Link to="/" className="navbar-brand">
                    Fudget
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarsExampleDefault"
                    aria-controls="navbarsExampleDefault"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>
                <div
                    className="collapse navbar-collapse"
                    id="navbarsExampleDefault"
                >
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to="/users" className="nav-link">
                                Users
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/posts" className="nav-link">
                                Posts
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/accounts" className="nav-link">
                                Accounts
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}
