import React from 'react';

class Home extends React.Component {
  state = {
    search: '',
  };

  handleSearch = ({ target }) => {
    const { value } = target;
    this.setState({ search: value });
  };

  render() {
    const { search } = this.state;
    return (
      <div>
        <input
          type="text"
          name="search"
          placeholder="Search"
          search={ search }
          onChange={ this.handleSearch }
        />
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
      </div>
    );
  }
}

export default Home;
