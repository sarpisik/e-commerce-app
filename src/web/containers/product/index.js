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

export default connect(mapStateToProps)(Product);
