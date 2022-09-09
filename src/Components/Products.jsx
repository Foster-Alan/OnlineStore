import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductsFromId } from '../services/api';

class Products extends React.Component {
  state = { product: '' };

  componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;
    getProductsFromId(id).then((response) => {
      this.setState({ product: response });
    });
  }

  render() {
    const { product } = this.state;
    return (
      <div>
        <p data-testid="product-detail-name" />
        { product.title }
        <img
          data-testid="product-detail-image"
          src={ product.thumbnail }
          alt={ product.title }
        />
        <p data-testid="product-detail-price" />
        { product.price }
        <div>
          <Link
            to="/ShoppingCart"
          >
            <button
              type="submit"
              data-testid="shopping-cart-button"
            >
              Adicionar Carrinho
            </button>
          </Link>
        </div>
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
