const store = {
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

export const productsState = store.getState().productsState
export default store
