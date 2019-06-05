import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import { Row, Col, Button, ButtonGroup } from 'react-bootstrap';
import {
  updateImageSizesOfProducts,
  getWindowSize,
  compareNumbers,
  backend
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
    // If user logged in, handle submit.
    // Else, navigate to login page.
    this.props.authUser
      ? target.name === 'cart'
        ? this.handleAddToCart()
        : this.handleBuy()
      : this.handleNavigate(ROUTES.LOGIN);
  };

  handleAddToCart = () => {
    const {
      addToCart,
      productId,
      product: { colors }
    } = this.props;
    const { orderCount, activeColorIndex } = this.state;
    const orderColor = colors[activeColorIndex];

    addToCart(productId, orderCount, orderColor);
  };

  handleBuy = () => {
    this.handleAddToCart();
    this.handleNavigate(ROUTES.CART);
  };

  handleNavigate = (route, state = false) =>
    this.props.history.push(route, state);

  toggleFavorite = (addToFavorites = false) => {
    const { authUser, addFavorite, removeFavorite, productId } = this.props;
    if (authUser) {
      this.setState({ isLoading: true });
      const favorites = addToFavorites
        ? [...authUser.favorites, productId]
        : authUser.favorites.filter(id => id !== productId);
      // api call
      backend(process.env.API_AUTH_USER_UPDATE, {
        email: authUser.email,
        session: authUser.session,
        favorites
      }).then(({ success, message }) => {
        if (success) {
          addToFavorites ? addFavorite(productId) : removeFavorite(productId);
        } else {
          alert(message);
        }
        this.setState({ isLoading: false });
      });
    } else {
      this.handleNavigate(ROUTES.LOGIN, true);
    }
  };

  render() {
    const { authUser, productId, product } = this.props;
    const { isLoading, pictures, orderCount, activeColorIndex } = this.state;

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
            />
            <ToggleFavorite
              isLoading={isLoading}
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

export default withRouter(Product);

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
