import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { getProductsFromId } from '../services/api';

class Products extends React.Component {
  state = {
    product: '',
    redirect: false,
  };

  componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;
    getProductsFromId(id).then((response) => {
      this.setState({ product: response });
    });
  }

  handleClickButton = () => {
    this.setState({ redirect: true });
  };

  render() {
    const { product, redirect } = this.state;
    const productPage = (
      <div>
        <p data-testid="product-detail-name">
          { product.title }
        </p>
        <img
          data-testid="product-detail-image"
          src={ product.thumbnail }
          alt={ product.title }
        />
        <p data-testid="product-detail-price">
          { product.price }
        </p>
        <div>
          <button
            type="submit"
            onClick={ this.handleClickButton }
            data-testid="shopping-cart-button"
          >
            Adicionar Carrinho
          </button>
        </div>
      </div>
    );
    return (
      <div>
        {redirect && <Redirect to="/ShoppingCart" />}
        {!redirect && productPage}
      </div>
    );
  }
}

Products.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Products;
