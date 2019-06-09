import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import withAuthUser from '../withAuthUser';
import * as ACTIONS from '../../constants/products';

const withProducts = Component => {
  class WithProducts extends PureComponent {
    fetchProductByName = (body, callBack) =>
      this.props.apiHandler('search', body, callBack);

    fetchProductsByCategory = (body, callBack) =>
      this.props.apiHandler('products', body, callBack);

    fetchProductById = (body, callBack) =>
      this.props.apiHandler('product', body, callBack);

    getProductsByCategory = category => this.props.productsState[category];

    getProductById = (category, id) =>
      this.getProductsByCategory(category).find(({ _id }) => _id === id);

    render() {
      return (
        <Component
          {...this.props}
          getProductsByCategory={this.getProductsByCategory}
          getProductById={this.getProductById}
          fetchProductById={this.fetchProductById}
          fetchProductsByCategory={this.fetchProductsByCategory}
          fetchProductByName={this.fetchProductByName}
        />
      );
    }
  }

  const mapStateToProps = ({ productsState }) => ({
    productsState
  });

  const mapDispatchToProps = dispatch => ({
    addProductsByCategory: data =>
      dispatch({
        type: ACTIONS.FETCH_PRODUCTS_BY_CATEGORY_SUCCESS,
        ...data
      })
  });

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(withAuthUser(WithProducts));
};

export default withProducts;
