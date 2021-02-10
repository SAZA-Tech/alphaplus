import React, { Component } from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom';
import './scss/style.scss';
import Login from './views/Login';
import SignUp from './views/Sign-up';

export class EApp extends Component {
    render() {
        return (
            <div>
                <SignUp/>
            </div>
        )
    }
}

export default EApp
