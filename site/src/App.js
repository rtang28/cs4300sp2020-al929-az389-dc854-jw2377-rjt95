import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Search from './search/Search';
import './App.css';

export default class App extends Component {
  render() {
    return (
      <header>
        <Router>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li className='prot1'>
                <a href='https://restaurant-match-v1.herokuapp.com'>Prototype 1</a>
              </li>
              <li>
                <a href='https://restaurant-match-v2.herokuapp.com'>Prototype 2</a>
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
      </header>

      // <Home />
    );
  }
}

class Home extends Component {
  render() {
    return (
      <Fragment>
        <h1 className='title'>Restaurant Match</h1>
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

