import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductsFromId } from '../services/api';
import Form from './Form';

class Products extends React.Component {
  state = {
    product: '',
  };

  componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;
    getProductsFromId(id).then((response) => {
      this.setState({ product: response });
    });
  }

  handleClickButton = () => {
    const { product } = this.state;
    const localProds = JSON.parse(localStorage.getItem('products')) || [];
    const produToAdd = Object.entries(product);
    const prodsNew = [...localProds, produToAdd];
    localStorage.setItem('products', JSON.stringify(prodsNew));
  };

  render() {
    const { product } = this.state;
    const productPage = (
      <div>
        <p data-testid="product-detail-name">{product.title}</p>
        <img
          data-testid="product-detail-image"
          src={ product.thumbnail }
          alt={ product.title }
        />
        <p data-testid="product-detail-price">{product.price}</p>
        <div>
          <div>
            <button
              type="submit"
              onClick={ this.handleClickButton }
              data-testid="product-detail-add-to-cart"
            >
              Adicionar Carrinho
            </button>
          </div>
          <div>
            <Link
              type="submit"
              data-testid="shopping-cart-button"
              to="/ShoppingCart"
            >
              Carrinho
            </Link>
          </div>
          <Form />
        </div>
      </div>
    );
    return <div>{productPage}</div>;
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
