import React, { PureComponent } from 'react';

const withGeoLocation = Component =>
  class WithGeoLocation extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        location: {}
      };
    }

    async componentDidMount() {
      let response = await fetch('http://ip-api.com/json');
      let location = await response.json();
      this.setState({ location });
    }

    render() {
      return <Component {...this.props} {...this.state} />;
    }
  };

export default withGeoLocation;
