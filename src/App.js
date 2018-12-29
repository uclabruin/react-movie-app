import React, { Component } from 'react';
import Header from "./header" 
import Main from "./main"
import MoviePage from "./moviepage"

import { BrowserRouter, Switch, Route } from "react-router-dom"
import { Link } from "react-router-dom";


const NotFound = () => (
  <div>
    <h3>Location not found. Error 404 :(</h3>
    <Link to="/">Go here to browse movies</Link>
  </div>
);

class App extends Component {
  render() {
    return (
    <BrowserRouter>

      <div className="App">
          <Switch>
              <Route exact path='/' component={Main} />
               <Route path="/movie_page/:movieId" component={MoviePage} />
              <Route component={NotFound} />
        </ Switch>
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
