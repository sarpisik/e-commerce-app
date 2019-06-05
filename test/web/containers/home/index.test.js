import React from 'react'
import { Provider } from 'react-redux'

import Home, { mapStateToProps } from '../../../../src/web/containers/home'
import store from '../helper'

describe('React Library', () => {
  describe('Connected Home', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <Home context={store} />
      </Provider>
    )
      .dive()
      .props()
      .context.getState()

    it('should have authUser prop from Redux state', () => {
      expect(wrapper.authUser).to.equal(null)
      expect(wrapper.productsState).to.equal(products)
    })
  })
  describe('mapStateToProps', () => {
    it('pass products of Redux store to Home component', () => {
      expect(mapStateToProps(store.getState())).to.deep.equal(store.getState())
    })
  })
})
