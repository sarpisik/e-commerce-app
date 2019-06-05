import React, { Component } from 'react'
import { areImagesLoaded } from '../Image'
import { updateImageSizesOfProducts, getWindowSize } from '../Helpers'
import SlideLayout from './SlideLayout'
import './index.css'

const screenWidth = getWindowSize()[0]
const screenWidthLimit = 768
const isNeedToUpdateImgDimensions = screenWidth >= screenWidthLimit
const newImgDimensions = 400
const baseImageSize = 200

export default class Slide extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: true,
      categoriesListHeight: 'auto',
      products: isNeedToUpdateImgDimensions
        ? props.products.map(product =>
            updateImageSizesOfProducts(product, baseImageSize, newImgDimensions)
          )
        : props.products
    }

    this.categoriesList = React.createRef()
  }

  componentDidMount() {
    window.addEventListener('orientationchange', this.handleOrientationChange)
    if (isNeedToUpdateImgDimensions) {
      const categoriesListWidth = this.getRefDimension(
        this.categoriesList.current,
        'width'
      )
      this.setState({ categoriesListHeight: categoriesListWidth })
    }
  }

  componentWillUnmount() {
    window.removeEventListener(
      'orientationchange',
      this.handleOrientationChange
    )
  }

  handleOrientationChange = () => {
    switch (window.orientation) {
      case -90:
        this.handleCategoriesListHeight()
        break
      case 90:
        this.handleCategoriesListHeight()
        break
      default:
        this.setState({ categoriesListHeight: 'auto' })
        break
    }
  }

  handleCategoriesListHeight = () => {
    const currentWindowWidth = getWindowSize()[0]
    const isNeedToUpdateCategoriesListHeight =
      currentWindowWidth >= screenWidthLimit
    isNeedToUpdateCategoriesListHeight && this.updateCategoriesListHeight()
  }

  updateCategoriesListHeight = () => {
    const categoriesListHeight = this.getRefDimension(this.productImg, 'height')
    this.setState({ categoriesListHeight })
  }

  getRefDimension = (ref, type) =>
    window.getComputedStyle(ref).getPropertyValue(type)

  callbackRef = node => (this.productImg = node)

  onImagesLoad = () => {
    const carouselElement = document.querySelector('.carousel.slide')
    this.setState({ isLoading: !areImagesLoaded(carouselElement) })
  }

  handleImagesHeight = () => (isNeedToUpdateImgDimensions ? '400' : 'auto')

  handleImagesWidth = () => (isNeedToUpdateImgDimensions ? '400' : '100%')

  render() {
    const { isLoading, categoriesListHeight, products } = this.state

    return (
      <SlideLayout
        isLoading={isLoading}
        products={products}
        categoriesListRef={this.categoriesList}
        categoriesList={this.props.categories}
        categoriesListHeight={categoriesListHeight}
        callbackRef={this.callbackRef}
        onLoad={this.onImagesLoad}
        imgHeight={this.handleImagesHeight}
        imgWidth={this.handleImagesWidth}
      />
    )
  }
}
