import React, { Component } from 'react'
import { HashRouter, BrowserRouter as  Router, Switch, Route } from 'react-router-dom';
import { AuthProvider } from './context/auth';
import './scss/style.scss';
import Login from './views/Login';
import SignUp from './views/Sign-up';
import AuthRoute from './components/AuthRoute';
import Home from './views/Home';
import Navbar from './components/Navbar';



export class App extends Component {
    render() {
        return (
            <AuthProvider>
                <Router>
                    <Navbar/>
                    <Route exact path='/' component={Home} />
                    <AuthRoute exact path='/Login' component={Login} />
                </Router>
            </AuthProvider>
        )
    }
}

export default App
