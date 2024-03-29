import React from 'react';
import { Link } from 'react-router-dom';
import { BsCart4 } from 'react-icons/bs';
import qtdAll from '../services/qtdPlus';
import { getProductsFromCategoryAndQuery, getCategories } from '../services/api';
import Category from './Category';
import '../Styles/Home.css';
import '../Styles/Products.css';

export default class Home extends React.Component {
  state = {
    search: '',
    productsApi: [],
    categorias: [],
  };

  componentDidMount() {
    getCategories().then((response) => this.setState({ categorias: response }));
  }

  handleSearch = ({ target }) => {
    const { value } = target;
    this.setState({ search: value });
  };

  handleCategory = async ({ target }) => {
    const { search } = this.state;
    const { value } = target;
    const response = await getProductsFromCategoryAndQuery(value, search);
    this.setState({ productsApi: response.results });
  };

  addToCart = ({ target: { value } }) => {
    const { productsApi } = this.state;
    const produToAdd = Object.entries(productsApi.filter(({ id }) => id === value)[0]);
    const localProds = JSON.parse(localStorage.getItem('products')) || [];
    const prodsNew = [...localProds, produToAdd];
    localStorage.setItem('products', JSON.stringify(prodsNew));
    qtdAll();
    this.forceUpdate();
    // eslint-disable-next-line no-alert
    alert('Adicionado ao seu carrinho');
  };

  render() {
    const { search, productsApi, categorias } = this.state;
    return (
      <div>
        <div>
          <div className="cart">
            <Link data-testid="shopping-cart-button" to="/ShoppingCart">
              <BsCart4 />
            </Link>
            <p data-testid="shopping-cart-size">{localStorage.getItem('qtdAll')}</p>
          </div>
          <h1>Foster Shop</h1>
          <div>
            <Category
              handleCategory={ this.handleCategory }
              categorias={ categorias }
            />

          </div>
          <div className="search">
            <input
              type="text"
              name="search"
              placeholder="Pesquisar"
              data-testid="query-input"
              search={ search }
              onChange={ this.handleSearch }
            />
            <button
              type="submit"
              data-testid="query-button"
              onClick={ this.handleCategory }
            >
              Pesquisar
            </button>
          </div>
        </div>

        <div>
          { productsApi.length === 0
          && (
            <div>
              <p
                data-testid="home-initial-message"
              >
                Digite algum termo de pesquisa ou escolha uma categoria.
              </p>
            </div>
          )}
        </div>

        { productsApi.length === 0 ? 'Nenhum produto foi encontrado'
          : (
            <ul className="Content-products">
              {productsApi.map((product) => (
                <li
                  data-testid="product"
                  key={ product.id }
                >
                  <div>
                    {product.shipping.free_shipping
                    && (<p className="frete">Frete grátis</p>)}
                  </div>
                  <Link
                    to={ `/Products/${product.id}` }
                    data-testid="product-detail-link"

                  >
                    <p>
                      { product.title }
                    </p>
                    <img src={ product.thumbnail } alt={ product.title } />
                    <p />
                    <p className="price">
                      { product.price }
                      R$
                    </p>
                  </Link>
                  <button
                    type="button"
                    data-testid="product-add-to-cart"
                    value={ product.id }
                    onClick={ this.addToCart }
                  >
                    Adicionar ao Carrinho
                  </button>
                </li>
              ))}
            </ul>
          )}
      </div>
    );
  }
}
