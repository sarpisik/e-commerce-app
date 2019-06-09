import React, { PureComponent } from 'react';
import { Row, Col } from 'react-bootstrap';
import { UserProductsList } from '..';
import withProducts from '../../session/withProducts';
import Spinner from '../Spinner';
import PurchaseBar from './PurchaseBar';

class Cart extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      onRequest: false,
      cartList: [],
      purchasingList: []
    };
  }

  componentDidMount() {
    this.setCartList();
  }

  setCartList = () =>
    this.props.products.forEach(({ category, _id, count }) => {
      let foundProduct = this.props.getProductById(category, _id);

      // If the product found in redux store, pass to state.
      // Else, get product from the server and pass to state.
      foundProduct
        ? this.setState(state => ({
            cartList: [...state.cartList, { ...foundProduct, count }]
          }))
        : this.props.fetchProductById({ category, _id }, (...response) =>
            this.onFetchProductById(count, ...response)
          );
    });

  onFetchProductById = (count, success, message, { products }) => {
    if (success) {
      this.setState(state => ({
        cartList: [...state.cartList, { ...products[0], count }]
      }));
    } else {
      alert(message);
    }
  };

  // Toggle the selected product on purchasing list.
  onChange = ({ target }) =>
    this.setState(state => {
      let purchasingList;
      const selectedProduct = state.cartList.find(
        ({ _id }) => _id === target.name
      );
      // If the selected product is already in the purchase list, remove from purchase list.
      // Else, add to purchasing list
      if (state.purchasingList.includes(selectedProduct)) {
        purchasingList = state.purchasingList.filter(
          ({ _id }) => _id !== selectedProduct._id
        );
      } else {
        purchasingList = [...state.purchasingList, selectedProduct];
      }
      return { purchasingList };
    });

  getPurchasingPrice = purchasingList =>
    purchasingList
      .reduce((prev, { price, count }) => prev + parseFloat(price * count), 0)
      .toFixed(2);

  removeProducts = () => {
    const { authUser, handleUserProduct } = this.props;
    const product = this.state.purchasingList.map(({ _id }) => _id);
    this.toggleClickFeedBack(true);
    handleUserProduct(
      'cart',
      {
        email: authUser.email,
        session: authUser.session,
        action: 'remove',
        product
      },
      this.respondHandler
    );
  };

  respondHandler = success => {
    if (success) {
      this.setState(state => ({
        purchasingList: [],
        cartList: [],
        onRequest: !state.onRequest
      }));
      this.setCartList();
    } else {
      alert('Access denied!');
      this.toggleClickFeedBack(false);
    }
  };

  toggleClickFeedBack = onRequest => this.setState({ onRequest });

  render() {
    const { cartList, purchasingList, onRequest } = this.state;

    // Show loading until products from the redux and the server are ready.
    if (this.props.products.length !== cartList.length) return <Spinner />;
    // If user has products in the cart, display.
    // Else, print below text.
    if (cartList.length > 0)
      return (
        <Row className="shadow">
          {purchasingList.length > 0 && (
            <PurchaseBar
              totalPrice={this.getPurchasingPrice(purchasingList)}
              deleteSelecteds={this.removeProducts}
              loading={onRequest}
            />
          )}
          <Col sm>
            <UserProductsList products={cartList} onChange={this.onChange} />
          </Col>
        </Row>
      );
    return <p>You have no product in your cart.</p>;
  }
}

export default withProducts(Cart);
