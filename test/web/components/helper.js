import React from 'react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'

export const store = {
  getState: function() {
    return {
      authUser: null,
      productsState: products
    }
  },
  subscribe: function() {},
  dispatch: function() {
    return null
  }
}

export const mountComponent = (Component, reduxStore = store) =>
  mount(
    <Provider store={reduxStore}>
      <MemoryRouter initialEntries={['/']} initialIndex={0}>
        {Component}
      </MemoryRouter>
    </Provider>
  )
