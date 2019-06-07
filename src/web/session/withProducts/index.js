import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import withAuthentication from '../withAuthentication';

const withProducts = Component => {
  class WithProducts extends PureComponent {
    render() {
      return <Component {...this.props} />;
    }
  }

  const mapStateToProps = ({ productsState }) => ({
    productsState
  });

  return connect(mapStateToProps)(withAuthentication(WithProducts));
};

export default withProducts;
