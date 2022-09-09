import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
    const { handleCategory } = this.props;
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
                value={ id }
                name="category"
                onClick={ handleCategory }
              />
              { name }
            </label>))
        }
      </div>
    );
  }
}

Category.propTypes = {
  handleCategory: PropTypes.func.isRequired,
};

export default Category;
