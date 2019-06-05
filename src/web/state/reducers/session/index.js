import * as ACTIONS from '../../../constants/session';

const INITIAL_STATE = {
  authUser: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTIONS.SIGN_IN_SUCCESS:
      return signIn(state, action.authUser);
    case ACTIONS.ADD_TO_CART:
      return addToCart(state, action);
    case ACTIONS.REMOVE_FROM_CART:
      return removeFromCart(state, action);
    case ACTIONS.ADD_FAVORITE:
      return addFavorite(state, action);
    case ACTIONS.REMOVE_FAVORITE:
      return removeFavorite(state, action);
    default:
      return state;
  }
};

function signIn(state, authUser) {
  return Object.assign({}, state, { authUser });
}
function addToCart(state, { _id, count, color }) {
  return {
    ...state,
    authUser: {
      ...state.authUser,
      cart: { ...state.authUser.cart, [_id]: { _id, count, color } }
    }
  };
}
function removeFromCart(state, { _id }) {
  const { [_id]: product, ...restProducts } = state.authUser.cart;
  return {
    ...state,
    authUser: {
      ...state.authUser,
      cart: restProducts
    }
  };
}
function addFavorite(state, { _id }) {
  return {
    ...state,
    authUser: {
      ...state.authUser,
      favorites: [...state.authUser.favorites, _id]
    }
  };
}
function removeFavorite(state, { _id }) {
  return {
    ...state,
    authUser: {
      ...state.authUser,
      favorites: state.authUser.favorites.filter(id => id !== _id)
    }
  };
}
