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
      <div id='about-container' className='about-body'>
        <div className='about-title'>
          <h2>About</h2>
        </div>
        <div className='about-body'>
          <p> Restaurant Match is a project by Alan Lin, Andy Zhu, David Chen, Jason Wong, and Ryan Tang for the final project of CS/INFO 4300 at Cornell University. </p>
          <p> See our code&nbsp;<a href= "https://github.com/rtang28/cs4300sp2020-al929-az389-dc854-jw2377-rjt95">here</a>.</p>  
        </div>
      </div>                
    )
  }
}

