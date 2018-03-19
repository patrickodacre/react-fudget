import React, { Component } from 'react'
import logo from './logo.svg'
// import './App.css'
import './assets/css/jumbotron.css'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

// components
import Header from './components/Header'
import Nav from './components/Nav'
import Main from './components/Main'
import Content from './components/Content'
import Footer from './components/Footer'

class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <Nav />
                    <Content />
                    <Footer />
                </div>
            </Router>
        )
    }
}

export default App
