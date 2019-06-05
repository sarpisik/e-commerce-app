import { mapStateToProps } from '../../../../src/web/containers/category'
import store, { productsState } from '../helper'

describe('Redux Library', () => {
  describe('mapStateToProps', () => {
    it('pass a category of Redux store to Category component', () => {
      const categoryName = 'Consumer Electronics'
      const category = productsState[categoryName]

      expect(
        mapStateToProps(
          { productsState },
          {
            categoryName
          }
        )
      ).to.deep.equal({
        category
      })
    })
  })
})
