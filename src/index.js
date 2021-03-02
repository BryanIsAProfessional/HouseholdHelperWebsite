import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import ReactDOM from 'react-dom';
import './index.css';
import App from './pages/App';
import Lists from './pages/Lists';
import Database from './pages/Database';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route path="/lists" component={Lists}/>
        <Route path="/api/:path" component={Database}/>
        <Route path="/api" component={Database}/>
        <Route path="/" component={App}/>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();
