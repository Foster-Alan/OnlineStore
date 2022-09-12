import React from 'react';

class Form extends React.Component {
  state = {
    email: '',
    avaliation: '',
    message: '',
    form: false,
  };

  handleInput = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  validation = (e) => {
    e.preventDefault();
    const { email, avaliation, message } = this.state;
    const regex = /\S+@\S+\.\S+/;
    if (!regex.test(email)) {
      this.setState({ form: true });
    }

    if ((email === '') || (avaliation === '') || (message === '')) {
      this.setState({ form: true });
    } else {
      this.setState({ email: '', avaliation: '', message: '', form: false });
    }
  };

  render() {
    const { email, message, form } = this.state;
    return (
      <div>
        <form>
          <input
            type="email"
            name="email"
            placeholder="Email"
            data-testid="product-detail-email"
            value={ email }
            onChange={ this.handleInput }
            required
          />
          <div>
            <label htmlFor="avaliation">
              1
              <input
                type="radio"
                name="avaliation"
                data-testid="1-rating"
                value={ 1 }
                onClick={ this.handleInput }
              />
            </label>
            <label htmlFor="avaliation">
              2
              <input
                type="radio"
                name="avaliation"
                data-testid="2-rating"
                value={ 2 }
                onClick={ this.handleInput }
              />
            </label>
            <label htmlFor="avaliation">
              3
              <input
                type="radio"
                name="avaliation"
                data-testid="3-rating"
                value={ 3 }
                onClick={ this.handleInput }
              />
            </label>
            <label htmlFor="avaliation">
              4
              <input
                type="radio"
                name="avaliation"
                data-testid="4-rating"
                value={ 4 }
                onClick={ this.handleInput }
              />
            </label>
            <label htmlFor="avaliation">
              5
              <input
                type="radio"
                name="avaliation"
                data-testid="5-rating"
                value={ 5 }
                onClick={ this.handleInput }
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
            type="submit"
            data-testid="submit-review-btn"
            onClick={ this.validation }
          >
            Avaliar
          </button>
        </form>
        <div>
          { form && <p data-testid="error-msg">Campos inválidos</p>}
        </div>
      </div>
    );
  }
}

export default Form;
