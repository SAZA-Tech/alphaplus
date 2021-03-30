import React, { useContext } from "react";
import {
  HashRouter,
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import "./scss/style.scss";
import AuthRoute from "./components/AuthRoute";
import { AuthProvider } from "./context/auth";
import { AuthContext } from "./context/auth";
// import Dashboard from "./containers/TheLayout";
const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);
const Test = () => <div>Testing</div>;
// Containers
const Dashboard = React.lazy(() => import("./containers/TheLayout"));
// Pages
const Login = React.lazy(() => import("./views/AdminLogin"));

function App() {
  const { user } = useContext(AuthContext);

  return (
    //<AdminLogin/>
    <AuthProvider>
      <Router>
        <React.Suspense fallback={loading}>
          <Switch>
            {/* <Route path="/" name="Home" render={(props) => <Dashboard />} /> */}

            <Route exact path="/login" name="Login Page" component={Login} />
            <AuthRoute  path="/"       component={Dashboard}  />
          </Switch>
        </React.Suspense>
      </Router>
    </AuthProvider>
  );
}

export default App;
