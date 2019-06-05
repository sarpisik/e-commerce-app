import * as ACTIONS from '../../../constants/products'
import products from '../../../assets/data/products/productsByCategories.json'

const INITIAL_STATE = products

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTIONS.FETCH_PRODUCTS_SUCCESS:
      return addProducts(state, action.products)

    case ACTIONS.FETCH_PRODUCTS_BY_CATEGORY_SUCCESS:
      return addProductsByCategory(state, action)
    default:
      return state
  }
}

function addProducts(state, products) {
  return Object.assign({}, state, products)
}

function addProductsByCategory(state, action) {
  return Object.assign({}, state, { [action.category]: action.products })
}
