import React, { PureComponent } from 'react'
import { Category } from '../../containers'
import { parseToKey } from '../Helpers'

export default class Categories extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      categoryRenderCount: 1
    }

    // If true, request animation frame.
    // Else, pass the scroll event.
    this.canRenderCategory = true
  }

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll, false)
  }
  componentWillUnmount() {
    this.removeOnScroll()
  }
  onScroll = () => {
    if (
      document.body.offsetHeight - window.pageYOffset <=
        window.innerHeight * 1.3 &&
      this.canRenderCategory
    ) {
      this.canRenderCategory = false
      window.requestAnimationFrame(this.loadCategory)
    }
  }
  removeOnScroll = () => {
    window.removeEventListener('scroll', this.onScroll, false)
  }

  loadCategory = () => {
    // If all categories has rendered, remove scroll event handler.
    // Else, render the next category.
    if (this.props.list.length === this.state.categoryRenderCount) {
      this.removeOnScroll()
    } else {
      this.setState(this.addCategoryCount, () => {
        this.canRenderCategory = true
      })
    }
  }

  addCategoryCount = ({ categoryRenderCount }) => ({
    categoryRenderCount: categoryRenderCount + 1
  })

  renderCategory = category => {
    const parsedCategoryName = parseToKey(category)

    return <Category key={category} categoryName={parsedCategoryName} />
  }

  render() {
    const { list } = this.props
    const { categoryRenderCount } = this.state

    return list.slice(0, categoryRenderCount).map(this.renderCategory)
  }
}
