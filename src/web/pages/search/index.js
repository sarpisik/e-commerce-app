import React, { PureComponent } from 'react';
import { Row } from 'react-bootstrap';
import {
  Spinner,
  PageTitle,
  PageBody,
  CategoryProductsList
} from '../../components';
import { Search, getCategories } from '../../components/Helpers';
import withProducts from '../../session/withProducts';

const INITIAL_STATE = {
  isLoading: true,
  products: []
};

class SearchPage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      ...INITIAL_STATE
    };
  }

  componentDidMount() {
    this.handleSearch();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.location.key !== this.props.location.key) {
      this.setState({ ...INITIAL_STATE });
      this.handleSearch();
    }
  }

  handleSearch = () => {
    this.repeat = 0;
    const search = Object.keys(this.props.search)[0];

    // If search query exist, handle search.
    // Else turn off loading.
    if (search) {
      const foundProductsOnLocal = Search.getFoundItems(
        search.toLocaleLowerCase(),
        this.props.productsState
      );
      this.saveFoundProducts(foundProductsOnLocal);
      const categoryList = getCategories(this.props.productsState);
      categoryList.forEach((category, index) => {
        this.props.fetchProductByName(
          {
            category,
            search
          },
          (...respond) => this.onSearchRespond(categoryList.length, ...respond)
        );
      });
    } else {
      this.setState({ isLoading: false });
    }
  };

  saveFoundProducts = foundProducts =>
    this.setState(state => {
      const newProducts = foundProducts.filter(
        product => !state.products.includes(product)
      );
      return { products: [...state.products, ...newProducts] };
    });

  onSearchRespond = (limit, success, message, { products }) => {
    this.repeat++;
    if (success) {
      this.props.addProductsByCategory({
        category: products[0].category,
        products
      });
      this.saveFoundProducts(products);
    }
    this.repeat === limit && this.setState({ isLoading: false });
  };

  render() {
    return this.state.isLoading ? (
      <Spinner />
    ) : (
      <Row className="justify-content-center bg-light">
        <PageTitle title="Search Result" />
        <PageBody sm={9}>
          {this.state.products.length > 0 ? (
            <CategoryProductsList products={this.state.products} />
          ) : (
            <p>No items found.</p>
          )}
        </PageBody>
      </Row>
    );
  }
}

export default withProducts(SearchPage);
