import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const mapStateToProps = ({ sessionState }) => {
  const authUser = sessionState.authUser;
  return { authUser };
};

const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        authUser: props.authUser || JSON.parse(localStorage.getItem('authUser'))
      };
    }

    componentDidUpdate({ authUser }) {
      authUser !== this.state.authUser && this.setState({ authUser });
    }

    render() {
      return <Component authUser={this.state.authUser} {...this.props} />;
    }
  }

  return connect(mapStateToProps)(withRouter(WithAuthentication));
};
export default withAuthentication;
