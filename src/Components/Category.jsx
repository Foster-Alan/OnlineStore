import React, { Component } from 'react';
import { getCategories } from '../services/api';

class Category extends Component {
  state = {
    categorias: [],
  };

  componentDidMount() {
    getCategories().then((response) => this.setState({ categorias: response }));
  }

  render() {
    const { categorias } = this.state;
    return (
      <div>
        {
          categorias.map(({ id, name }) => (
            <label
              htmlFor={ name }
              key={ id }
              data-testid="category"
            >
              <input
                type="radio"
                id={ name }
                value={ name }
                name="category"
              />
              { name }
            </label>))
        }
      </div>
    );
  }
}

export default Category;
