import { combineReducers } from 'redux'
import sessionState from './session'
import productsState from './products'

const rootReducer = combineReducers({
  sessionState,
  productsState
})

export default rootReducer
