import React, { PureComponent } from 'react';
import withAuthUser from '../../session/withAuthUser';
import { withRouter } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import { Row, Col, Button, ButtonGroup } from 'react-bootstrap';
import {
  updateImageSizesOfProducts,
  getWindowSize,
  compareNumbers
} from '../Helpers';
import Spinner from '../Spinner';
import Icon from '../Icon';
import ProductSlide from './ProductSlide';
import { areImagesLoaded } from '../Image';
import ProductInfo from './ProductInfo';
import { ReviewStarsForProductPage } from '..';
import ColorsList from './ColorsList';
import AddToCartOrBuy from './AddToCartOrBuy';

const maxHeightAndWidth = 400;

class Product extends PureComponent {
  constructor(props) {
    super(props);
    this.productPictureSrc = updateImageSizesOfProducts(
      props.product,
      maxHeightAndWidth
    ).picture;
    this.productIndex = props.product.index;
    this.spinnerContainerHeight = getWindowSize().sort(compareNumbers);

    this.state = {
      isLoading: true,
      onRequest: false,
      pictures: setProductImage(this.productPictureSrc, this.productIndex),
      orderCount: 1,
      activeColorIndex: 0
    };
  }

  onImagesLoad = () => {
    const carouselElement = document.querySelector('.carousel.slide');
    this.setState({ isLoading: !areImagesLoaded(carouselElement) });
  };

  adjustDimensions = () =>
    this.spinnerContainerHeight[1] > maxHeightAndWidth
      ? maxHeightAndWidth
      : this.spinnerContainerHeight[1];

  handleColorSelect = value => {
    const activeColorIndex = value;
    this.setState({ activeColorIndex });
  };

  handleOrderCount = ({ target }) => {
    this.setState(({ orderCount }) => ({
      orderCount: target.name === 'increase' ? orderCount + 1 : orderCount - 1
    }));
  };

  handleSubmit = ({ target }) => {
    target.name === 'cart' ? this.handleAddToCart() : this.handleBuy();
  };

  handleAddToCart = () => {
    const {
      addToCart,
      productId,
      product: { colors }
    } = this.props;
    const { orderCount, activeColorIndex } = this.state;

    const color = colors[activeColorIndex];
    const product = {
      _id: productId,
      count: orderCount,
      color
    };

    this.handleApiCall(
      process.env.API_AUTH_USER_CART,
      { product },
      // CallBack to update Redux
      addToCart,
      product
    );
  };

  handleBuy = () => {
    this.handleAddToCart();
    this.props.handleNavigate(ROUTES.CART);
  };

  handleNavigate = (route, state = false) =>
    this.props.history.push(route, state);

  toggleFavorite = (addToFavorites = false) => {
    const { authUser, addFavorite, removeFavorite, productId } = this.props;
    const updateReduxOnSuccess = addToFavorites ? addFavorite : removeFavorite;
    const favorites = addToFavorites
      ? [...authUser.favorites, productId]
      : authUser.favorites.filter(id => id !== productId);

    this.handleApiCall(
      process.env.API_AUTH_USER_UPDATE,
      { favorites },
      // CallBack to update Redux
      updateReduxOnSuccess,
      productId
    );
  };

  handleApiCall = (url, data, callBack, productId) => {
    const { authUser, apiCall, handleNavigate } = this.props;
    // If user logged in, make api call.
    // Else, navigate to login page.
    if (authUser) {
      this.setState({ onRequest: true });
      // api call
      apiCall(url, {
        email: authUser.email,
        session: authUser.session,
        ...data
      })
        .then(({ success, message }) => {
          if (success) {
            callBack(productId);
          } else {
            alert(message);
          }
          this.setState({ onRequest: false });
        })
        .catch(err => {
          alert(err);
          this.setState({ onRequest: false });
        });
    } else {
      handleNavigate(ROUTES.LOGIN, true);
    }
  };

  render() {
    const { authUser, productId, product } = this.props;
    const {
      isLoading,
      onRequest,
      pictures,
      orderCount,
      activeColorIndex
    } = this.state;

    const isInFavorites =
      authUser && authUser.favorites.find(_id => _id === productId);

    return (
      <>
        <Row id="product" className="bg-white mb-3">
          <Col
            sm="4"
            className="px-0 align-self-stretch"
            style={{
              minHeight: `${
                isLoading ? this.adjustDimensions() + 'px' : 'auto'
              }`
            }}>
            {isLoading && <Spinner />}
            <ProductSlide
              isLoading={isLoading}
              name={product.name}
              pictures={pictures}
              height={this.adjustDimensions() + 'px'}
              handleImageLoad={this.onImagesLoad}
            />
          </Col>
          <Col sm="8" className="px-0">
            <Title title={product.name} />
            <ReviewRatings average={product.avgRev} />
            <Price currency={product.currency} price={product.price} />
            <ShippingDetails />
            <ColorsList
              productColors={product.colors}
              activeColorIndex={activeColorIndex}
              handleColorSelect={this.handleColorSelect}
            />
            <StockInfo isStock={product.isActive} quantity={product.amount} />
            {product.isActive && (
              <OrderCount
                onChangeAmount={this.handleOrderCount}
                orderCount={orderCount}
                stockQuantity={product.amount}
              />
            )}
            <AddToCartOrBuy
              handleSubmit={this.handleSubmit}
              disabled={!product.isActive}
              isLoading={onRequest}
            />
            <ToggleFavorite
              isLoading={onRequest}
              isInFavorites={isInFavorites}
              onClickToggle={this.toggleFavorite}
            />
          </Col>
        </Row>
        <AboutProduct about={product.about} />
      </>
    );
  }
}
export default withAuthUser(withRouter(Product));

function setProductImage(src, index) {
  const pictures = [
    src,
    src.replace(index, index + 1),
    src.replace(index, index + 2),
    src.replace(index, index + 3)
  ];
  return pictures;
}

// Child Components
function Title({ title }) {
  return <ProductInfo className="m-0" description={title} />;
}
function ReviewRatings({ average }) {
  return (
    <ProductInfo
      className="m-0"
      description={
        <>
          <ReviewStarsForProductPage average={average} />
          {`(${average})`}
        </>
      }
    />
  );
}
function Price({ currency, price }) {
  return (
    <ProductInfo
      className="m-0"
      label="Price:"
      description={currency + '' + price}
    />
  );
}
function ShippingDetails() {
  return (
    <ProductInfo
      className="m-0"
      label="Shipping:"
      description={`0.19$ to your country via unregistered air mail.
          Ship between: date1 - date2. Estimated Shipping in N business days.`}
    />
  );
}
function StockInfo({ isStock, quantity }) {
  const description = isStock ? quantity : 'Out Of Stock';
  return (
    <ProductInfo className="m-0" label="In Stock" description={description} />
  );
}
function OrderCount({ orderCount, stockQuantity, onChangeAmount }) {
  const isIncreaseDisabled = orderCount > stockQuantity;
  const isDecreaseDisabled = orderCount < 2;
  return (
    <ProductInfo
      className="m-0"
      label="Order Amount"
      description={
        <ButtonGroup>
          <Button
            name="increase"
            onClick={onChangeAmount}
            disabled={isIncreaseDisabled}>
            +
          </Button>
          <span className="bg-light border-primary btn">{orderCount}</span>
          <Button
            name="decrease"
            onClick={onChangeAmount}
            disabled={isDecreaseDisabled}>
            -
          </Button>
        </ButtonGroup>
      }
    />
  );
}
function ToggleFavorite({ isLoading, isInFavorites, onClickToggle }) {
  if (isLoading) return <p>Please wait...</p>;
  if (isInFavorites)
    return <RemoveFromFavorites handleClick={() => onClickToggle()} />;
  return <AddToFavorites handleClick={() => onClickToggle(true)} />;
}
function AddToFavorites({ handleClick }) {
  return (
    <ProductInfo
      className="m-0"
      description={
        <Button variant="link" onClick={handleClick}>
          <Icon icon={['far', 'heart']}>Add to Favorites</Icon>
        </Button>
      }
    />
  );
}
function RemoveFromFavorites({ handleClick }) {
  return (
    <ProductInfo
      className="m-0"
      description={
        <Button variant="link" onClick={handleClick}>
          <Icon icon="heart">Remove From Favorites</Icon>
        </Button>
      }
    />
  );
}
function AboutProduct({ about }) {
  return (
    <ProductInfo
      className="bg-white"
      label="Description"
      labelSizes={[12, 12]}
      description={about}
    />
  );
}
