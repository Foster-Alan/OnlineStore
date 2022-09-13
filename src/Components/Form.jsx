import React from 'react';
import PropTypes from 'prop-types';

class Form extends React.Component {
  state = {
    email: '',
    avaliation: '',
    message: '',
    avaliaçoes: [],
    invalid: false,
    check1: false,
    check2: false,
    check3: false,
    check4: false,
    check5: false,
  };

  componentDidUpdate(prevProps) {
    const { prodId } = this.props;
    if (prevProps.prodId !== prodId) {
      this.getAvaliation();
    }
  }

  getAvaliation = () => {
    const { prodId } = this.props;
    const id = JSON.parse(localStorage.getItem(prodId)) || [];
    this.setState({ avaliaçoes: id });
  };

  // LOGICA DO REGEX RETIRADO DO POST NO SITE STACKOVERFLOW 'https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript'//
  handleInput = ({ target }) => {
    this.setState({ invalid: false });
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  validation = () => {
    const regex = /\S+@\S+\.\S+/;
    const { email, avaliation } = this.state;
    return (!regex.test(email)
    || (email === '') || (avaliation === ''));
  };

  handleCheck = ({ target: { id, value, name } }) => {
    this.setState({ invalid: false });
    this.setState({ [name]: value, [id]: true });
  };

  handleButton = ({ target: { value } }) => {
    const { email, avaliation, message } = this.state;
    const invalidInputs = this.validation();
    if (invalidInputs) {
      this.setState({ invalid: true });
    } else {
      this.setState({ invalid: false });
      const reviews = JSON.parse(localStorage.getItem(value)) || [];
      const avalObj = Object.fromEntries([
        ['email', email],
        ['text', message],
        ['rating', avaliation]]);
      localStorage.setItem([value], JSON.stringify([...reviews, avalObj]));
      this.setState({ email: '',
        avaliation: '',
        message: '',
        check1: false,
        check2: false,
        check3: false,
        check4: false,
        check5: false });
    }
    const tmp = JSON.parse(localStorage.getItem(value)) || [];
    this.setState({ avaliaçoes: tmp });
  };

  render() {
    const { email, message, invalid, avaliaçoes, check1, check2,
      check3, check4, check5 } = this.state;
    const { prodId } = this.props;
    return (
      <div>
        <form>
          <input
            type="email"
            name="email"
            placeholder="Email"
            data-testid="product-detail-email"
            value={ email }
            onChange={ this.handleCheck }
            required
          />
          <div>
            <label htmlFor="avaliation">
              1
              <input
                type="radio"
                name="avaliation"
                data-testid="1-rating"
                id="check1"
                value={ 1 }
                onChange={ this.handleCheck }
                checked={ check1 }
              />
            </label>
            <label htmlFor="avaliation">
              2
              <input
                type="radio"
                name="avaliation"
                data-testid="2-rating"
                value={ 2 }
                id="check2"
                onChange={ this.handleCheck }
                checked={ check2 }
              />
            </label>
            <label htmlFor="avaliation">
              3
              <input
                type="radio"
                name="avaliation"
                data-testid="3-rating"
                value={ 3 }
                id="check3"
                onChange={ this.handleCheck }
                checked={ check3 }
              />
            </label>
            <label htmlFor="avaliation">
              4
              <input
                type="radio"
                name="avaliation"
                data-testid="4-rating"
                value={ 4 }
                id="check4"
                onChange={ this.handleCheck }
                checked={ check4 }
              />
            </label>
            <label htmlFor="avaliation">
              5
              <input
                type="radio"
                name="avaliation"
                data-testid="5-rating"
                value={ 5 }
                id="check5"
                onChange={ this.handleCheck }
                checked={ check5 }
              />
            </label>
          </div>
          <textarea
            name="message"
            cols="30"
            rows="10"
            data-testid="product-detail-evaluation"
            placeholder="Mensagem"
            value={ message }
            onChange={ this.handleInput }
          />
          <button
            type="button"
            data-testid="submit-review-btn"
            value={ prodId }
            onClick={ this.handleButton }
          >
            Avaliar
          </button>
        </form>
        <div>
          { invalid && <p data-testid="error-msg">Campos inválidos</p>}
        </div>
        <div>
          <ul>
            {
              avaliaçoes.map(({ email: userEmail, text, rating }, index) => (
                <li key={ index }>
                  <h3 data-testid="review-card-email">
                    {userEmail}
                  </h3>
                  <p data-testid="review-card-rating">
                    {rating}
                  </p>
                  <p data-testid="review-card-evaluation">
                    {text}
                  </p>
                </li>))
            }
          </ul>
        </div>
      </div>
    );
  }
}

Form.propTypes = {
  prodId: PropTypes.string,
};
Form.defaultProps = {
  prodId: undefined,
};

export default Form;
