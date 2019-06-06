import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Spinner } from '../../components';
import * as ACTIONS from '../../constants/session';

const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        isLoading: true
      };
    }

    componentDidMount() {
      const { authUser } = this.props;

      // If authUser exist in local storage, request updated user info.
      // Else, show off loading screen.
      if (authUser) {
        const { email, session } = authUser;

        this.makeApiCall(process.env.API_AUTH_USER_INFO, {
          email,
          session
        })
          .then(({ success, message, ...authUser }) => {
            // If the request handled successful, update redux store.
            // Else, show off loading screen.
            if (success) {
              this.props.updateAuthUserCredentials(authUser);
            } else {
              alert(message);
            }
            this.setState({ isLoading: false });
          })
          .catch(err => {
            console.error(err);
            this.setState({ isLoading: false });
          });
      } else {
        this.setState({ isLoading: false });
      }
    }

    componentDidUpdate(prevProps, prevState) {
      // Update local storage on every credential changes
      prevProps.authUser !== this.props.authUser &&
        localStorage.setItem('authUser', JSON.stringify(this.props.authUser));
    }

    makeApiCall = (url, data) => {
      return fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }).then(response => response.json());
    };

    render() {
      return this.state.isLoading ? (
        <Spinner />
      ) : (
        <Component apiCall={this.makeApiCall} {...this.props} />
      );
    }
  }

  const mapStateToProps = ({ sessionState }, ownProps) => {
    const authUser = sessionState.authUser;
    return { authUser, ...ownProps };
  };

  const mapDispatchToProps = dispatch => ({
    updateAuthUserCredentials: authUser =>
      dispatch({
        type: ACTIONS.UPDATE_CREDENTIALS,
        authUser
      })
  });

  return withRouter(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(WithAuthentication)
  );
};
export default withAuthentication;
