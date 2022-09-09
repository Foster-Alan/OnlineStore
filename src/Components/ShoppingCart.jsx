import React, { Component } from 'react';
import { getProductsFromId } from '../services/api';

export default class Cart extends Component {
  state = {
    cart: [],
  };

  componentDidMount() {
    // const localProds = localStorage.getItem('products').slice(1);
    const localProds = JSON.parse(localStorage.getItem('products'));
    console.log(localProds);
    const { cart } = this.state;
    /*
    localProds.split(',').forEach(async (prod) => (
      cart.push(await getProductsFromId(prod))));
    this.setState({ cart });

    console.log('DidMount: ', cart); */
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
                <p>{ prod.title }</p>
                <img src={ prod.thumbnail } alt={ prod.title } />
                <p />
                { prod.price }
              </li>))}
          </ul>
        )
    );
  }
}
