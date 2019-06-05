import productsReducer from '../../../../../src/web/state/reducers/products'
import * as ACTIONS from '../../../../../src/web/constants/products'
// import products from '../../../../../temporary/products.json'
import products from '../../../../../temporary/productsByCategories.json'

describe('Redux products reducer', () => {
  it('should return the initial state', () => {
    expect(productsReducer(undefined, {})).to.deep.equal(products)
  })

  it('should handle add products', () => {
    expect(
      productsReducer(undefined, {
        type: ACTIONS.FETCH_PRODUCTS_SUCCESS,
        products
      })
    ).to.deep.equal(products)
  })
})
