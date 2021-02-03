import React, { Component } from 'react'
// import { HashRouter, Route, Switch } from 'react-router-dom';
import './scss/style.scss';
import Login from './views/Login';
export class EApp extends Component {
    render() {
        return (
            <div>
                <Login/>
            </div>
        )
    }
}

export default EApp
