import React, { Component } from 'react';
import { HashRouter, Route,Router, Switch } from 'react-router-dom';
import './scss/style.scss';
import AdminLogin from './views/AdminLogin';
import AuthRoute from './components/AuthRoute';
import { AuthProvider } from './context/auth';


const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const TheLayout = React.lazy(() => import('./containers/TheLayout'));



class App extends Component {

  render() {
     return (
      
      //<AdminLogin/> 
      <AuthProvider>
                <Router>
                  
                    <AuthRoute exact path='/AdminLogin' component={AdminLogin} />
                </Router>
            </AuthProvider>

     
    );
  }
}

export default App;
