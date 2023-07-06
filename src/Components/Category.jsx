import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../Styles/Category.css';

class Category extends Component {
  render() {
    const { handleCategory, categorias } = this.props;
    return (
      <div>
        <h2>Categorias</h2>
        <div className="category">
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
                  value={ id }
                  name="category"
                  onClick={ handleCategory }
                />
                { name }
              </label>))
          }
        </div>
      </div>
    );
  }
}

Category.propTypes = {
  handleCategory: PropTypes.func.isRequired,
  categorias: PropTypes.arrayOf(Object).isRequired,
};

export default Category;
