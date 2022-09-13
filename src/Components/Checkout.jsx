import React from 'react';
import PropTypes from 'prop-types';

class Checkout extends React.Component {
  state = {
    products: [],
    name: '',
    email: '',
    cpf: '',
    phone: '',
    cep: '',
    adress: '',
    payment: '',
    verify: false,
  };

  componentDidMount() {
    this.getProducts();
  }

  handleInput = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  getProducts() {
    const response = JSON.parse(localStorage.getItem('products'));
    const products = response.map((e) => Object.fromEntries(e));
    this.setState({ products });
  }

  validation = () => {
    const { name, email, cpf, phone, cep, adress, payment } = this.state;
    const { history } = this.props;
    const all = [name, email, cpf, phone, cep, adress, payment];
    if (all.some((e) => e === '')) {
      this.setState({ verify: true });
    } else {
      this.setState({ verify: false });
      localStorage.clear();
      history.push('/');
    }
  };

  render() {
    const { products, name, email, cpf, phone, cep, adress, verify } = this.state;
    return (
      <div>
        <div>
          { verify && <p data-testid="error-msg">Campos inválidos</p>}
        </div>
        <div>
          { products.map((product) => <p key={ product.id }>{product.title}</p>)}
        </div>
        <form>
          <div>
            <label htmlFor="name">
              <input
                type="text"
                name="name"
                value={ name }
                onChange={ this.handleInput }
                placeholder="Name"
                data-testid="checkout-fullname"
                required
              />
            </label>
            <label htmlFor="email">
              <input
                type="email"
                name="email"
                value={ email }
                onChange={ this.handleInput }
                data-testid="checkout-email"
                placeholder="E-mail"
                required
              />
            </label>
            <label htmlFor="cpf">
              <input
                type="text"
                name="cpf"
                value={ cpf }
                onChange={ this.handleInput }
                placeholder="CPF"
                data-testid="checkout-cpf"
                required
              />
            </label>
            <label htmlFor="phone">
              <input
                type="text"
                name="phone"
                value={ phone }
                onChange={ this.handleInput }
                placeholder="Phone"
                data-testid="checkout-phone"
                required
              />
            </label>
            <label htmlFor="cep">
              <input
                type="text"
                name="cep"
                value={ cep }
                onChange={ this.handleInput }
                placeholder="CEP"
                data-testid="checkout-cep"
                required
              />
            </label>
            <label htmlFor="adress">
              <input
                type="text"
                name="adress"
                value={ adress }
                onChange={ this.handleInput }
                placeholder="Adress"
                data-testid="checkout-address"
                required
              />
            </label>
            <label htmlFor="payment">
              <input
                type="radio"
                name="payment"
                value="Boleto"
                onClick={ this.handleInput }
                data-testid="ticket-payment"
              />
              Boleto
              <input
                type="radio"
                name="payment"
                value="Visa"
                onClick={ this.handleInput }
                data-testid="visa-payment"
              />
              Visa
              <input
                type="radio"
                name="payment"
                value="MasterCard"
                onClick={ this.handleInput }
                data-testid="master-payment"
              />
              MasterCard
              <input
                type="radio"
                name="payment"
                value="Elo"
                onClick={ this.handleInput }
                data-testid="elo-payment"
              />
              Elo
            </label>
          </div>
          <button
            type="button"
            data-testid="checkout-btn"
            onClick={ this.validation }
          >
            Concluir
          </button>
        </form>
      </div>
    );
  }
}

Checkout.propTypes = {
  history: PropTypes.shape.isRequired,
};

export default Checkout;
