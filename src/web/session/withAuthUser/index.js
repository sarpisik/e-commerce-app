import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import withAuthentication from '../withAuthentication';
import * as ACTIONS from '../../constants/session';

const withAuthUser = Component => {
  class WithAuthUserContext extends PureComponent {
    handleNavigate = (route, state = false) =>
      this.props.history.push(route, state);

    render() {
      return <Component {...this.props} handleNavigate={this.handleNavigate} />;
    }
  }

  const mapDispatchToProps = dispatch => ({
    handleLogin: authUser =>
      dispatch({
        type: ACTIONS.SIGN_IN_SUCCESS,
        authUser
      }),
    handleSessionId: sessionId =>
      dispatch({
        type: ACTIONS.SESSION_ID,
        sessionId
      })
  });

  return connect(
    null,
    mapDispatchToProps
  )(withAuthentication(WithAuthUserContext));
};

export default withAuthUser;
