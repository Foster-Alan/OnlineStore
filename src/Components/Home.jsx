import React from 'react';
import { Link } from 'react-router-dom';
import { getProductsFromCategoryAndQuery, getCategories } from '../services/api';
import Category from './Category';

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
main-group-2-requisito-8
  };

  addToCart = ({ target }) => {
    const localProds = JSON.parse(localStorage.getItem('products')) || [];

    const prodsNew = [...localProds, target.value];
    localStorage.setItem('products', JSON.stringify(prodsNew));


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
main-group-2-versao-2
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
