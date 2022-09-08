import React from 'react';
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

  render() {
    const { search, productsApi } = this.state;
    return (
      <div>
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
          { search === ''
          && (
            <p
              data-testid="home-initial-message"
            >
              Digite algum termo de pesquisa ou escolha uma categoria.
            </p>
          )}
        </div>
        <div>
          <ul>
            { productsApi.length === 0 ? 'Nenhum produto foi encontrado'
              : (
                productsApi.map((product, index) => (
                  <li
                    key={ index }
                    data-testid="product"
                  >
                    <p>{ product.title }</p>
                    <img src={ product.thumbnail } alt={ product.title } />
                    <p />
                    { product.price }
                  </li>
                )))}
          </ul>
          
        </div>
       <Category />
      </div>
    );
  }
}

export default Home;
