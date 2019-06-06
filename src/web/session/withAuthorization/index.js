import React from 'react';
import withAuthUser from '../withAuthUser';
import { Spinner } from '../../components';

const withAuthorization = condition => route => Component => {
  class WithAuthorization extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        isLoading: true
      };
    }

    componentDidMount() {
      const { authUser, apiCall, handleNavigate } = this.props;
      // If user token exist, make api call.
      // Else, use passed route to send.
      if (condition && authUser) {
        const { email, session } = authUser;
        // session api call
        apiCall(process.env.API_AUTH_USER_CART, {
          email,
          session
        })
          .then(({ success, message, ...authUser }) => {
            // If the request handled successful, update redux store.
            // Else, show off loading screen.
            if (success) {
              this.props.updateAuthUserCredentials(authUser);
              this.setState({ isLoading: false });
            } else {
              alert(message);
              handleNavigate(route);
            }
          })
          .catch(err => {
            console.error(err);
            handleNavigate(route);
          });
      } else {
        handleNavigate(route);
      }
    }

    render() {
      console.log(Component);
      return this.state.isLoading ? <Spinner /> : <Component {...this.props} />;
    }
  }

  return withAuthUser(WithAuthorization);
};
export default withAuthorization;
