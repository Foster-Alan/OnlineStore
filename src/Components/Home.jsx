import React from 'react';
import { Link } from 'react-router-dom';
import { getProductsFromCategoryAndQuery, getCategories } from '../services/api';
import Category from './Category';

class Home extends React.Component {
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
    console.log(value, search, response);
  };

  render() {
    const { search, productsApi, categorias } = this.state;
    return (
      <div>
        <div>
          <Link data-testid="shopping-cart-button" to="/ShoppingCart">Carrinho</Link>
        </div>
        <input
          type="text"
          name="search"
          placeholder="Search"
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
        <div>
          { productsApi.length === 0 ? 'Nenhum produto foi encontrado'
            : (
              <ul>
                {productsApi.map((product) => (
                  <Link
                    to={ `/Products/${product.id}` }
                    data-testid="product-detail-link"
                    key={ product.id }
                  >
                    <li
                      data-testid="product"
                    >
                      <p>
                        { product.title }
                      </p>
                      <img src={ product.thumbnail } alt={ product.title } />
                      <p />
                      { product.price }
                    </li>
                  </Link>
                ))}
              </ul>
            )}
        </div>
        <div>
          <Category
            handleCategory={ this.handleCategory }
            categorias={ categorias }
          />
        </div>
      </div>
    );
  }
}

export default Home;
