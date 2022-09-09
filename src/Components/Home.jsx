import React from 'react';
import { getProductsFromCategoryAndQuery } from '../services/api';
import Category from './Category';

class Home extends React.Component {
  state = {
    search: '',
    productsApi: [],
    // productsCart: [],
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
    const { value } = target;
    const response = await getProductsFromCategoryAndQuery(value, search);
    this.setState({ productsApi: await response.results });
  };

  addToCart = ({ target }) => {
    const { productsCart } = this.state;
    // productsCart.push(target.value);

    this.setState({ productsCart });
    // const localProds = localStorage.getItem('products');

    if (localProds === '' || localProds === null) {
      localStorage.setItem('products', target.value);
    }

    const prodsNew = [localProds, target.value];
    prodsNew.join(',');
    localStorage.setItem('products', JSON.stringify(prodsNew));
  };

  render() {
    const { search, productsApi, productsCart } = this.state;
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
          { productsApi.length === 0
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
                    <button
                      type="button"
                      data-testid="product-add-to-cart"
                      value={ product.id }
                      onClick={ this.addToCart }
                    >
                      Adicionar ao Carrinho
                    </button>
                  </li>
                )))}
          </ul>
          { console.log(productsCart) }
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
