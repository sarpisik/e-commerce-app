import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import withAuthUser from '../withAuthUser';

const withProducts = Component => {
  class WithProducts extends PureComponent {
    fetchProductById = (data, callBack) =>
      this.props.apiHandler('product', data, callBack);
    getProductsByCategory = category => this.props.productsState[category];

    getProductById = (category, id) =>
      this.getProductsByCategory(category).find(({ _id }) => _id === id);

    render() {
      return (
        <Component
          {...this.props}
          getProductsByCategory={this.getProductsByCategory}
          getProductById={this.getProductById}
        />
      );
    }
  }

  const mapStateToProps = ({ productsState }) => ({
    productsState
  });

  return connect(mapStateToProps)(withAuthUser(WithProducts));
};

export default withProducts;
