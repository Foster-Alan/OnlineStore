import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../Styles/Category.css';

class Category extends Component {
  render() {
    const { handleCategory, categorias } = this.props;
    return (
      <div>
        <select
          onChange={ handleCategory }
          data-testid="category"
        >
          <option value="">Escolha uma categoria</option>
          {categorias.map(({ id, name }) => (
            <option
              key={ id }
              value={ id }
            >
              {name}
            </option>
          ))}
        </select>
      </div>
    );
  }
}

Category.propTypes = {
  handleCategory: PropTypes.func.isRequired,
  categorias: PropTypes.arrayOf(Object).isRequired,
};

export default Category;
