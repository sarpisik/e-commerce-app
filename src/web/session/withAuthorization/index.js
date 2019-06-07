import React from 'react';
import withAuthUser from '../withAuthUser';
import { Spinner } from '../../components';

const withAuthorization = condition => route => Component => {
  class WithAuthorization extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        authUser: null
      };
    }

    componentDidMount() {
      const { authUser, getUserInfo, handleNavigate } = this.props;
      // If user token exist, make api call.
      // Else, push to route.
      if (condition && authUser) {
        const { email, session } = authUser;
        // Request user credentials + user cart items list
        getUserInfo(
          process.env.API_AUTH_USER_INFO,
          {
            email,
            session
          },
          this.onRespondCredentials
        );
      } else {
        handleNavigate(route);
      }
    }

    componentDidUpdate() {
      const { authUser, handleNavigate } = this.props;
      // If user signed out, push to route.
      // Else, update authUser
      if (!authUser) {
        handleNavigate(route);
      } else {
        authUser !== this.state.authUser && this.setState({ authUser });
      }
    }

    onRespondCredentials = (success, message, authUser) => {
      // If the request handled successful, update redux store.
      // Else, show off loading screen & push to route.
      if (success) {
        this.props.updateAuthUserCredentials(authUser);
        this.setState({ authUser });
      } else {
        console.error(message);
        handleNavigate(route);
      }
    };

    render() {
      return this.state.authUser ? <Component {...this.props} /> : <Spinner />;
    }
  }

  return withAuthUser(WithAuthorization);
};
export default withAuthorization;
