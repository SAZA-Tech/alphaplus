import React, { Component } from "react";
import {
  HashRouter,
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { AuthProvider } from "./context/auth";
import "./scss/style.scss";
import Login from "./views/Login";
import SignUp from "./views/Sign-up";
import {AuthRoute} from "./components/AuthRoute";
import Home from "./views/Home";
import Navbar from "./components/Navbar";
import EndUserProfile from "./views/EndUserProfile";
import ProfileSetting from "./views/profileSetting/ProfileSetting";
import AccountSecurty from "./views/profileSetting/AccountSecurty";


import Article from "./views/Content/Article";
import Draft from "./views/Content/Draft";
import { MyAuthors } from "./views/Content/MyAuthors";
import { theme } from "./Theme";
import { ThemeProvider } from "@material-ui/styles";
import { Container } from "@material-ui/core";
export class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <Router>
            <Navbar />
            <div>
              <Route exact path="/" component={Home} />
              <Route exact path="/EndUserProfile" component={EndUserProfile} />
              <Route exact path="/ProfileSetting" component={ProfileSetting} />
              <Route exact path="/AccountSecurty" component={AccountSecurty} />



              <Route exact path="/article" component={Article} />
              <Route  path="/draft/:draftId" component={Draft} />
              <Route exact path="/MyAuthers/:username/" component={MyAuthors} />
              <AuthRoute exact path="/Signup" component={SignUp} />

              <AuthRoute exact path="/Login" component={Login} />
            </div>
          </Router>
        </AuthProvider>
      </ThemeProvider>
    );
  }
}

export default App;
