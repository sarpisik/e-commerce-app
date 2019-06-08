import React, { PureComponent } from 'react';
import * as HISTORY from '../../../constants/history';
import * as ROUTES from '../../../constants/routes';
import { handleNavigation } from '../../Helpers';

const withProductsList = Component =>
  class WithProductsList extends PureComponent {
    handleNavigate = (category, productId) => {
      const path = this.createPath(category, productId);
      handleNavigation(path);
    };

    createPath = (category, productId) => ({
      actionType: HISTORY.PUSH,
      action: {
        pathname: ROUTES.PRODUCT,
        search: `cat=${category}&prod=${productId}`
      }
    });

    render() {
      return <Component {...this.props} onNavigate={this.handleNavigate} />;
    }
  };

export default withProductsList;
