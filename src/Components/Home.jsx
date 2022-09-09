import React from 'react';
import { Link } from 'react-router-dom';
import { getProductsFromCategoryAndQuery } from '../services/api';
import Category from './Category';

class Home extends React.Component {
  state = {
    search: '',
    productsApi: [],
  };

  componentDidMount() {
    this.setState({ productsApi: [] });
  }

  handleSearch = ({ target }) => {
    const { value } = target;
    this.setState({ search: value });
  };

  handleGetData = async () => {
    const { search } = this.state;
    const response = await getProductsFromCategoryAndQuery('', search);
    console.log('rs', response);
    this.setState({ productsApi: await response.results });
  };

  handleCategory = async ({ target }) => {
    const { search } = this.state;
    const { value } = await target;
    const response = await getProductsFromCategoryAndQuery(value, search);
    this.setState({ productsApi: await response.results });
  };

  render() {
    const { search, productsApi } = this.state;
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
          onClick={ this.handleGetData }
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
          <div>
            <ul>
              { productsApi.length === 0 ? 'Nenhum produto foi encontrado'
                : (
                  <div>
                    {productsApi.map((product, index) => (
                      <Link
                        key={ index }
                        data-testid="product-detail-link"
                        to={ `/Products${product.id}` }
                      >
                        <li
                          key={ index }
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
                  </div>
                )}
            </ul>
          </div>
        </div>
        <div>
          <Category
            handleCategory={ this.handleCategory }
          />
        </div>
      </div>
    );
  }
}

export default Home;
