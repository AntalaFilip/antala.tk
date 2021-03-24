import React from 'react';
import ReactDOM from 'react-dom';

import { 
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'
import reportWebVitals from './reportWebVitals';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import routerMain from './main/router';


ReactDOM.render(
  <React.StrictMode>
    <Router basename="/">
      <Switch>
        <Route path="/main" children={routerMain} />
        <Route path="" />
        <Route exact path="/" children={redirToMain} />
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

function redirToMain() {
  window.location.href = "/main";
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
