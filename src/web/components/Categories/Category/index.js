import React, { PureComponent } from 'react'
import * as HISTORY from '../../../constants/history'
import * as ROUTES from '../../../constants/routes'
import Spinner from '../../Spinner'
import { CardContainer, Card } from '../../Cards'
import { areImagesLoaded } from '../../Image'
import { setDelayTime, handleNavigation, parseToValue } from '../../Helpers'

const delayRadiusPerEachCard = 10

export default class Category extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: true,
      horizontalScrollBarHeight: 0
    }

    this.categoryName = parseToValue(props.categoryName)
  }

  componentDidUpdate() {
    // If the loading of all products pictures finished whether
    // succeed nor failed,
    // set container element's height equal to category title element
    // and category list element. So that the horizontal
    // scroll bar will be hidden.
    if (!this.state.isLoading) {
      // Height of the category title element
      const headerHeight = getChildNodeDimensions(
        this.galleryElement,
        '.header-link'
      ).height
      // Height of the horizontal products list element
      const bodyHeight = getChildNodeDimensions(
        this.galleryElement,
        '.flex-nowrap.card-group'
      ).height
      // Set container element
      this.galleryElement.style.height = `${bodyHeight + headerHeight}px`
      // Horizontally scrolling element
      this.scrollContainer = this.galleryElement.querySelector(
        '.custom-row-category'
      )
      // Now the user can scroll horizontally
      this.scrollContainer.style.overflowX = 'scroll'

      // In the below, we set formula to calculate on how much pixel
      // the scroll bar should scroll horizontally on clicking the arrow buttons
      // or swiping on products.
      // Then save the value on state
      const cardsContainerWidth = this.galleryElement.clientWidth
      const cardWidth = getChildNodeDimensions(
        this.galleryElement,
        '.custom-card.card'
      ).width
      const cardsCountInContainer = Math.floor(cardsContainerWidth / cardWidth)
      const scrollValue = cardsCountInContainer * cardWidth
      this.state.horizontalScrollBarHeight ||
        this.setState(({ horizontalScrollBarHeight }) => ({
          horizontalScrollBarHeight: horizontalScrollBarHeight + scrollValue
        }))
    }
  }

  refCallback = element => (this.galleryElement = element)

  handleImageChange = () => {
    this.setState({
      isLoading: !areImagesLoaded(this.galleryElement)
    })
  }

  renderProducts = (
    { _id, category, picture, name, price, currency },
    index
  ) => (
    <Card
      display={this.state.isLoading || 'show-on'}
      style={{
        transitionDelay: setDelayTime(index, delayRadiusPerEachCard)
      }}
      key={index}
      listIndex={index}
      imgSrc={picture}
      handleImageChange={this.handleImageChange}
      title={name}
      price={price}
      currency={currency}
      onClick={() => this.onClickProduct(category, _id)}
    />
  )

  onClickProduct = (category, productId) => {
    const path = this.createPath(category, productId)
    handleNavigation(path)
  }

  createPath = (category, productId) => ({
    actionType: HISTORY.PUSH,
    action: {
      pathname: ROUTES.PRODUCT,
      search: `cat=${category}&prod=${productId}`
    }
  })

  onScroll = toRight => {
    toRight
      ? (this.scrollContainer.scrollLeft += this.state.horizontalScrollBarHeight)
      : (this.scrollContainer.scrollLeft -= this.state.horizontalScrollBarHeight)
  }

  render() {
    const { category, categoryName } = this.props
    const { isLoading } = this.state
    return (
      <CardContainer
        title={this.categoryName}
        searchQuery={categoryName}
        refCallback={this.refCallback}
        onScroll={this.onScroll}>
        {isLoading && <Spinner />}
        {category.map(this.renderProducts)}
      </CardContainer>
    )
  }
}

function getChildNodeDimensions(parentNode, selector) {
  return parentNode.querySelector(selector).getBoundingClientRect()
}
