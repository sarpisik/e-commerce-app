import React, { PureComponent } from 'react'
import { Row, Col } from 'react-bootstrap'
import * as HISTORY from '../../../constants/history'
import * as ROUTES from '../../../constants/routes'
import { Spinner } from '../..'
import SlideImagesList from '../SlideImage'
import SlideList from '../SlideList'
import SlideCategoriesList from '../SlideCategoriesList'
import { setRoute, handleNavigation } from '../../Helpers'

const slideChangeSecond = 2500

export default class SlideLayout extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      index: 0,
      direction: null
    }
  }

  onHoverListItem = e => {
    this.setState({
      index: e.target.value
    })
  }

  onSlideSelect = (index, direction) => {
    this.setState({
      index,
      direction
    })
  }

  handleNavigateToProductPage = (category, productId) => {
    const searchString = `cat=${category}&prod=${productId}`
    const location = setRoute(HISTORY.PUSH, ROUTES.PRODUCT, searchString)
    handleNavigation(location)
  }

  render() {
    const {
      isLoading,
      products,
      categoriesList,
      categoriesListRef,
      categoriesListHeight,
      callbackRef,
      onLoad,
      imgHeight,
      imgWidth
    } = this.props
    const { index, direction } = this.state

    return (
      <Row noGutters className="slide justify-content-md-center">
        <Col sm={12} md={8}>
          <Row noGutters className="position-relative">
            {isLoading && <Spinner />}
            <Col
              sm={6}
              className={`d-none d-sm-block show-off ${isLoading ||
                'show-on'}`}>
              <SlideList
                products={products}
                activeIndex={index}
                onHoverItem={this.onHoverListItem}
                onClick={this.handleNavigateToProductPage}
              />
            </Col>
            <Col sm={6} className={`px-0 show-off ${isLoading || 'show-on'}`}>
              <SlideImagesList
                products={products}
                interval={slideChangeSecond}
                activeIndex={index}
                direction={direction}
                callbackRef={callbackRef}
                onSelect={this.onSlideSelect}
                onClick={this.handleNavigateToProductPage}
                onLoad={onLoad}
                imgHeight={imgHeight}
                imgWidth={imgWidth}
              />
            </Col>
          </Row>
        </Col>
        <Col
          ref={categoriesListRef}
          style={{
            height: categoriesListHeight
          }}
          sm={12}
          md
          className="categories order-md-first">
          <SlideCategoriesList categoriesList={categoriesList} />
        </Col>
      </Row>
    )
  }
}
