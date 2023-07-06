import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import qtdAll from '../services/qtdPlus';

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
      localStorage.setItem(`qnt${id}`, '1');
    });
    this.setState({ cart: prodsObj });
  }

  handleQntMinus = () => {
    const { cart } = this.state;
    const qtd = cart.length;
    const localQtd = Number(localStorage.getItem('qtdAll'));
    const sub = localQtd - 1;
    const verify = sub < qtd ? qtd : sub;
    localStorage.setItem('qtdAll', verify);
  };

  handleQnt = ({ target: { name } }) => {
    const { cart } = this.state;
    const valorUm = 1;
    const id = name.split('-');
    if (name.includes('mais')) {
      qtdAll();
      const soma = (Number(localStorage.getItem(`qnt${id[1]}`)) + valorUm);
      const valueMax = cart.filter((e) => e.id === id[1]);
      const verifyValueMax = soma > valueMax[0].available_quantity
        ? valueMax[0].available_quantity : soma;
      localStorage.setItem(`qnt${id[1]}`, verifyValueMax);
    } else {
      this.handleQntMinus();
      const soma = (Number(localStorage.getItem(`qnt${id[1]}`)) - valorUm);
      const result = soma < 1 ? 1 : soma;
      localStorage.setItem(`qnt${id[1]}`, result);
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
          <h1 data-testid="shopping-cart-empty-message">
            Seu carrinho está vazio
          </h1>
        </div>
      )
        : (
          <div>
            <h1>Meu carrinho</h1>
            <ul className="Content-products">
              { cart.map((prod) => (
                <li key={ prod.id }>
                  <p data-testid="shopping-cart-product-name">{ prod.title }</p>
                  <img src={ prod.thumbnail } alt={ prod.title } />
                  <div className="quanty">
                    <button
                      type="button"
                      name={ `menos-${prod.id}` }
                      data-testid="product-decrease-quantity"
                      onClick={ this.handleQnt }
                    >
                      -
                    </button>
                    <p data-testid="shopping-cart-product-quantity">
                      { localStorage.getItem(`qnt${prod.id}`) }
                    </p>
                    <button
                      type="button"
                      name={ `mais-${prod.id}` }
                      data-testid="product-increase-quantity"
                      onClick={ this.handleQnt }
                    >
                      +
                    </button>
                  </div>
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
            <Link
              data-testid="checkout-products"
              to="/Checkout"
            >
              Finalizar Compras
            </Link>
          </div>
        )
    );
  }
}
