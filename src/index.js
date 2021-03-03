import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import ReactDOM from 'react-dom';
import './index.css';
import AuthProvider from './contexts/AuthContext';
import NavBar from './components/NavBar';
import App from './pages/App';
import Login from './pages/LoginPage';
import Lists from './pages/Lists';
import Database from './pages/Database';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <NavBar/>
      <Router>
          <Switch>
            <Route path={["/login", "/signup"]} component={Login}/>
            <Route path="/lists" component={Lists}/>
            <Route path="/api/:path" component={Database}/>
            <Route path="/api" component={Database}/>
            <Route exact path="/" component={App}/>
          </Switch>
        </Router>
    </AuthProvider>
    
    
  </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();
