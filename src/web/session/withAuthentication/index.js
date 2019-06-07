import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Spinner } from '../../components';
import * as ACTIONS from '../../constants/session';
import Backend from '../../backend';

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
        Backend.apiHandler(
          'session',
          {
            email,
            session
          },
          this.handleUserCredentials
        );
      } else {
        this.removeLoadingIndicator();
      }
    }

    componentDidUpdate(prevProps) {
      // Update local storage on every credential changes
      prevProps.authUser !== this.props.authUser &&
        localStorage.setItem('authUser', JSON.stringify(this.props.authUser));
    }

    handleUserCredentials = (success, message, authUser) => {
      // If the request handled successful, update redux store.
      success && this.props.updateAuthUserCredentials(authUser);
      this.removeLoadingIndicator();
    };

    removeLoadingIndicator = () => this.setState({ isLoading: false });

    render() {
      return this.state.isLoading ? (
        <Spinner />
      ) : (
        <Component {...Backend} {...this.props} />
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
