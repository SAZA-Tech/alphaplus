import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import { AuthProvider } from "./context/auth";
import "./scss/style.scss";
import Login from "./views/Login";
import SignUp from "./views/Sign-up";
import { AuthRoute, ProtectedRoute } from "./components/AuthRoute";
import Home from "./views/Home";
import EndUserProfile from "./views/EndUserProfile";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Article from "./views/Content/Article";
import Draft from "./views/Content/Draft";
import Portfolio from "./views/Portfolio";
import { MyAuthors } from "./views/Content/MyAuthors";
import { theme } from "./Theme";
import { ThemeProvider } from "@material-ui/styles";
import { CircularProgress } from "@material-ui/core";
import Company from "./views/Company/Company";
import ProfileSetting from "./views/profileSetting/ProfileSetting";
import AccountSecurty from "./views/profileSetting/AccountSecurty";
// const Company = React.lazy(() => import("./views/Company/Company"));
export class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <Router>
            <React.Suspense fallback={CircularProgress}>
              <Navbar />
              <div
                style={{
                  backgroundColor: theme.palette.background.default,
                  paddingBottom: theme.spacing(8),
                }}
              >
                <Route exact path="/" component={Home} />
                <Route path="/userProfile/:userId" component={EndUserProfile} />
                <ProtectedRoute
                  exact
                  path="/ProfileSetting/"
                  component={ProfileSetting}
                />

                <ProtectedRoute
                  exact
                  path="/AccountSecurty/"
                  component={AccountSecurty}
                />

                <Route path="/company/:companyId" component={Company} />
                <Route path="/article/:articleId" component={Article} />
                <ProtectedRoute exact path="/Portfolio" component={Portfolio} />
                <ProtectedRoute path="/draft/:draftId" component={Draft} />
                <ProtectedRoute
                  exact
                  path="/MyAuthers/:username/"
                  component={MyAuthors}
                />
                <AuthRoute exact path="/Signup" component={SignUp} />

                <AuthRoute exact path="/Login" component={Login} />
              </div>
              <Footer />
            </React.Suspense>
          </Router>
        </AuthProvider>
      </ThemeProvider>
    );
  }
}

export default App;
