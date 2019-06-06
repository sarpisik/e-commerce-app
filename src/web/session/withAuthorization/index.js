import React from 'react';
import { withRouter } from 'react-router-dom';
import withAuthUser from '../withAuthUser';
import * as ROUTES from '../../constants';

const withAuthorization = Component => {
  class WithAuthorization extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        isLoading: true
      };
    }

    async componentDidMount() {
      // If user token exist, make api call.
      // Else, send to login page.
      if (this.props.authUser) {
        // session api call
        this.setState({ isLoading: false });
      } else {
        this.props.history.push(ROUTES.LOGIN);
      }
    }

    render() {
      return this.state.isLoading ? <Loading /> : <Component {...this.props} />;
    }
  }

  return withAuthUser(withRouter(WithAuthorization));
};
export default withAuthorization;
