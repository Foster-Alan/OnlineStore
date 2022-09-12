import React, { Component } from 'react';

export default class Cart extends Component {
  state = {
    cart: [],
  };

  componentDidMount() {
    this.getProducts();
  }

  async getProducts() {
    const localProds = JSON.parse(localStorage.getItem('products')) || [];
    const prodsObj = localProds.map((curr) => Object.fromEntries(curr));
    prodsObj.forEach(({ id }) => {
      localStorage.setItem(id, '1');
    });
    this.setState({ cart: prodsObj });
  }

  handleQnt = ({ target: { name } }) => {
    const valorUm = 1;
    const id = name.split('-');
    if (name.includes('mais')) {
      const soma = (Number(localStorage.getItem(id[1])) + valorUm);
      localStorage.setItem(id[1], soma);
    } else {
      const soma = (Number(localStorage.getItem(id[1])) - valorUm);
      const result = soma < 1 ? 1 : soma;
      localStorage.setItem(id[1], result);
    }
    this.forceUpdate();
  };

  handleRemove = ({ target: { value } }) => {
    const { cart } = this.state;
    const removedItem = cart.filter(({ id }) => id !== value);
    const removedItemArray = removedItem.map((curr) => Object.entries(curr)) || [];
    console.log(removedItemArray);
    localStorage.setItem('products', JSON.stringify(removedItemArray));
    this.setState({ cart: removedItem });
  };

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
                <button
                  type="button"
                  name={ `menos-${prod.id}` }
                  data-testid="product-decrease-quantity"
                  onClick={ this.handleQnt }
                >
                  -
                </button>
                <p data-testid="shopping-cart-product-quantity">
                  { localStorage.getItem(prod.id) }
                </p>
                <button
                  type="button"
                  name={ `mais-${prod.id}` }
                  data-testid="product-increase-quantity"
                  onClick={ this.handleQnt }
                >
                  +
                </button>
                <p>
                  { prod.price }
                </p>
                <button
                  type="button"
                  data-testid="remove-product"
                  value={ prod.id }
                  onClick={ this.handleRemove }
                >
                  Remover
                </button>
              </li>
            ))}
          </ul>
        )
    );
  }
}
