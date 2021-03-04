import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import AuthProvider from './contexts/AuthContext';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import App from './pages/App';
import Login from './pages/LoginPage';
import Signup from './pages/SignupPage';
import Lists from './pages/Lists';
import Profile from './pages/Profile';
import Database from './pages/Database';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <NavBar/>
      <Router>
        <Switch>
          <Route exact path="/" component={App}/>
          <Route path="/login" component={Login}/>
          <Route path="/signup" component={Signup}/>
          <Route path="/lists" component={Lists}/>
          <Route path="/profile" component={Profile}/>
          <Route path="/api/:path" component={Database}/>
          <Route path="/api" component={Database}/>
          
        </Switch>
      </Router>
      <Footer/>
    </AuthProvider>
    
    
  </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();
