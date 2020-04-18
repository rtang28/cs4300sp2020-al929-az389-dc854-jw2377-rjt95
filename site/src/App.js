import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Search from './search/Search';
import './App.css';

export default class App extends Component {
  render() {
    return (
      <Router>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    );
  }
}

class Home extends Component {
  render() {
    return (

      <Fragment>
        <h3>Home!</h3>
        <Search></Search>
      </Fragment>
    );
  }
}

class About extends Component {
  render() {
    return (
      <div id='about-placeholder'></div>
    )
  }
}

