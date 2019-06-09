import React, { PureComponent } from 'react';
import withProducts from '../../../session/withProducts';

const withScroll = Component => {
  class WithScroll extends PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        loadLimit: 10,
        loading: false
      };
    }

    componentDidMount() {
      this.scroll = true;
      window.addEventListener('scroll', this.onScroll, false);
    }

    componentWillUnmount() {
      window.removeEventListener('scroll', this.onScroll, false);
    }

    componentDidUpdate(prevProps) {
      prevProps.location.key !== this.props.location.key &&
        (this.scroll = true);
    }

    localProducts = () =>
      this.props.getProductsByCategory(this.props.categoryName);

    onScroll = () =>
      this.scroll &&
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
      this.loadMoreProducts();

    loadMoreProducts() {
      this.scroll = false;
      const body = {
        skip: this.localProducts().length,
        limit: this.state.loadLimit,
        category: this.props.categoryName
      };
      this.toggleLoader(true);
      this.props.fetchProductsByCategory(body, this.handleResponse);
    }

    handleResponse = (success, message, { products }) => {
      const localProducts = this.localProducts();

      // If API request success...
      if (success) {
        // If fetched products different than local products, set redux store.
        // Else, stop this and next requests.
        if (
          products[products.length - 1]._id !==
          localProducts[localProducts.length - 1]._id
        ) {
          this.props.addProductsByCategory({
            category: this.props.categoryName,
            products
          });
          this.scroll = true;
        }
      } else {
        this.scroll = false;
      }
      this.toggleLoader(false);
    };

    toggleLoader = loading => this.setState({ loading });

    render() {
      return <Component {...this.props} loading={this.state.loading} />;
    }
  }
  return withProducts(WithScroll);
};

export default withScroll;
