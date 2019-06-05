import React, { PureComponent } from 'react'
import * as HISTORY from '../../constants/history'
import * as ROUTES from '../../constants/routes'
import List from './List'
import { handleNavigation } from '../Helpers'
import './index.css'

export default class ProductsList extends PureComponent {
  handleNavigate = (category, productId) => {
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

  render() {
    return <List onNavigate={this.handleNavigate} products={this.props.list} />
  }
}
