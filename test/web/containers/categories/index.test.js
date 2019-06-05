import { mapStateToProps } from '../../../../src/web/containers/categories'
import { productsState } from '../helper'

describe('Redux Library', () => {
  describe('mapStateToProps', () => {
    it('passes products of Redux store to Categories component', () => {
      expect(mapStateToProps({ productsState })).to.deep.equal({
        productsState
      })
    })
  })
})
