import { connect } from 'react-redux';
import * as ACTIONS from '../../constants/session';
import { Product } from '../../components';

export const mapStateToProps = (
  { productsState },
  { categoryName, productId }
) => {
  const category = productsState[categoryName];
  const product = category.find(item => item._id === productId);

  return {
    product
  };
};

export const mapDispatchToProps = dispatch => ({
  addToCart: (_id, count, color) =>
    dispatch({
      type: ACTIONS.ADD_TO_CART,
      _id,
      count,
      color
    }),
  removeFromCart: _id =>
    dispatch({
      type: ACTIONS.REMOVE_FROM_CART,
      _id
    }),
  addFavorite: _id =>
    dispatch({
      type: ACTIONS.ADD_FAVORITE,
      _id
    }),
  removeFavorite: _id =>
    dispatch({
      type: ACTIONS.REMOVE_FAVORITE,
      _id
    })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Product);
