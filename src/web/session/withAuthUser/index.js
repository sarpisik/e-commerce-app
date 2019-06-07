import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import withAuthentication from '../withAuthentication';
import * as ACTIONS from '../../constants/session';
import * as ROUTES from '../../constants/routes';

const withAuthUser = Component => {
  class WithAuthUserContext extends PureComponent {
    constructor(props) {
      super(props);

      this.urls = {
        login: process.env.API_LOGIN,
        signUp: process.env.API_SIGN_UP
      };
    }

    handleSession = (sessionType, formValues, formCallBack) => {
      const url = this.urls[sessionType];
      this.props.getSessionInfo(url, formValues, (...respond) =>
        this.onSessionRespond(...respond, formCallBack)
      );
    };

    onSessionRespond = (success, message, authUser, formCallBack) => {
      const { handleLogin, location, history } = this.props;
      // If the user logged in successfully...
      if (success) {
        // Set user credentials to redux store
        handleLogin(authUser);
        // If the user navigated to here from somewhere, send back.
        // Else, replace to cart page.
        location.state ? history.goBack() : history.replace(ROUTES.CART);
      } else {
        // Show fail feedback.
        alert(message);
        formCallBack();
      }
    };

    handleNavigate = (route, state = false) =>
      this.props.history.push(route, state);

    render() {
      return (
        <Component
          {...this.props}
          handleSession={this.handleSession}
          handleNavigate={this.handleNavigate}
        />
      );
    }
  }

  const mapDispatchToProps = dispatch => ({
    // User credential methods
    handleLogin: authUser =>
      dispatch({
        type: ACTIONS.SIGN_IN_SUCCESS,
        authUser
      }),
    handleSessionId: sessionId =>
      dispatch({
        type: ACTIONS.SESSION_ID,
        sessionId
      }),
    signOut: () =>
      dispatch({
        type: ACTIONS.SIGN_OUT
      }),
    // User selection methods
    addToCart: product =>
      dispatch({
        type: ACTIONS.ADD_TO_CART,
        ...product
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

  return connect(
    null,
    mapDispatchToProps
  )(withAuthentication(WithAuthUserContext));
};

export default withAuthUser;
