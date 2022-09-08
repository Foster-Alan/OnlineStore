import React, { Component } from 'react';

export default class Cart extends Component {
  state = {
    cart: [],
  };

  render() {
    const { cart } = this.state;
    return (
      cart.length === 0 && (
        <div>
          <p data-testid="shopping-cart-empty-message">
            Seu carrinho está vazio
          </p>
        </div>
      ));
  }
}
