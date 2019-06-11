import React, { PureComponent } from 'react';
import { Row } from 'react-bootstrap';
import { Category } from '../../containers';
import { Product, Spinner } from '../../components';
import withProducts from '../../session/withProducts';

class ProductPage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true
    };
  }

  componentDidMount() {
    const { cat, prod, getProductById, fetchProductById } = this.props;
    const product = getProductById(cat, prod);

    // If product exist in redux, pass it to child.
    // Else, fetch product.
    if (product) {
      this.setState({ isLoading: false });
    } else {
      fetchProductById(
        {
          category: cat,
          _id: prod
        },
        (...response) => this.onFetchProductById(...response)
      );
    }
  }

  onFetchProductById = (success, message, { products }) => {
    if (success) {
      this.props.addProductsByCategory({
        category: products[0].category,
        products
      });
      this.setState({ isLoading: false });
    } else {
      alert(message);
    }
  };

  render() {
    const product = this.props.getProductById(this.props.cat, this.props.prod);
    return this.state.isLoading ? (
      <Spinner />
    ) : (
      <>
        <Product product={product} {...this.props} />
        <Row className="bg-white">
          <Category categoryName={product.category} />
        </Row>
      </>
    );
  }
}

export default withProducts(ProductPage);
