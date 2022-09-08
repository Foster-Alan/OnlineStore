import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Components/Home';
import ShoppingCart from './Components/ShoppingCart';

class Routes extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={ Home } />
          <Route path="/ShoppingCart" component={ ShoppingCart } />
        </Switch>
      </div>
    );
  }
}

export default Routes;
