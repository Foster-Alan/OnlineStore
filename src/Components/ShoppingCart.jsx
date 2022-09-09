import React, { Component } from 'react';
import { getProductsFromId } from '../services/api';

export default class Cart extends Component {
  state = {
    cart: [],
  };

  componentDidMount() {
    // const localProds = JSON.parse(localStorage.getItem('products'));

    // const products = await Promise.all(localProds.map((prod) => (
    //   (getProductsFromId(prod)))));
    // this.setState({ cart: products });
    this.getProducts();
  }

  async getProducts() {
    const localProds = JSON.parse(localStorage.getItem('products'));

    const products = await Promise.all(localProds.map((prod) => (
      (getProductsFromId(prod)))));
    this.setState({ cart: products });
    console.log('oi');
  }

  render() {
    const { cart } = this.state;
    return (
      cart.length === 0 ? (
        <div>
          <p data-testid="shopping-cart-empty-message">
            Seu carrinho está vazio
          </p>
        </div>
      )
        : (
          <ul>
            { cart.map((prod) => (
              <li key={ prod.id }>
                <p data-testid="shopping-cart-product-name">{ prod.title }</p>
                <img src={ prod.thumbnail } alt={ prod.title } />
                <p data-testid="shopping-cart-product-quantity">
                  { prod.available_quantity }
                </p>
                { prod.price }
              </li>))}
          </ul>
        )
    );
  }
}
