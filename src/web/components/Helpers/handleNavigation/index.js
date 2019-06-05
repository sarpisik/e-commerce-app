import * as HISTORY from '../../../constants/history'
import history from '../browserHistory'
import clearWhiteSpaces from '../clearWhiteSpacesOnText'
import createDirectionObject from '../createDirectionObject'

export default ({ actionType, action }) => {
  switch (actionType) {
    case HISTORY.PUSH:
      newLocation(action)
      break
    case HISTORY.REPLACE:
      updateLocation(action)
      break
    default:
      break
  }
}

function newLocation({ pathname, search }) {
  const location = createLocation(pathname, search)

  history.push(location)
}

function updateLocation({ pathname, search }) {
  const location = createLocation(pathname, search)

  history.replace(location)
}

export function createLocation(pathname, search) {
  const searchText = clearWhiteSpaces(search)
  return createDirectionObject(pathname, searchText)
}
