import * as ACTIONS from '../../../constants/session';

const INITIAL_STATE = {
  // Get user credentials from local storage if exist.
  authUser: JSON.parse(localStorage.getItem('authUser'))
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTIONS.SIGN_IN_SUCCESS:
      return setLocalUser(state, action.authUser);
    case ACTIONS.SIGN_OUT:
      return signOut(state, action.authUser);
    case ACTIONS.UPDATE_CREDENTIALS:
      return setLocalUser(state, action.authUser);
    case ACTIONS.ADD_TO_CART:
      return addToCart(state, action.product);
    case ACTIONS.REMOVE_FROM_CART:
      return removeFromCart(state, action._id);
    case ACTIONS.ADD_FAVORITE:
      return addFavorite(state, action.product);
    case ACTIONS.REMOVE_FAVORITE:
      return removeFavorite(state, action._id);
    default:
      return state;
  }
};

function setLocalUser(state, authUser) {
  // Set user credentials to local storage.
  localStorage.setItem('authUser', JSON.stringify(authUser));
  // Set store
  return Object.assign({}, state, { authUser });
}
function signOut(state) {
  // Remove user credentials from local storage.
  localStorage.removeItem('authUser');
  return Object.assign({}, state, { authUser: null });
}
function addToCart(state, product) {
  return {
    ...state,
    authUser: {
      ...state.authUser,
      cart: [...state.authUser.cart, product]
    }
  };
}
function removeFromCart(state, productId) {
  return {
    ...state,
    authUser: {
      ...state.authUser,
      cart: state.authUser.cart.filter(({ _id }) => _id !== productId)
    }
  };
}
function addFavorite(state, product) {
  return {
    ...state,
    authUser: {
      ...state.authUser,
      favorites: [...state.authUser.favorites, product]
    }
  };
}
function removeFavorite(state, productId) {
  return {
    ...state,
    authUser: {
      ...state.authUser,
      favorites: state.authUser.favorites.filter(({ _id }) => _id !== productId)
    }
  };
}
