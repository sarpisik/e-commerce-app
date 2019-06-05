import * as HISTORY from '../../../constants/history'
import * as ROUTES from '../../../constants/routes'
import { parseToKey, handleNavigation } from '..'

export const setRoute = (actionType, pathname, search) => ({
  actionType,
  action: {
    pathname,
    search
  }
})

export default e => {
  const categoryName = parseToKey(e.target.innerText)
  const location = setRoute(HISTORY.PUSH, ROUTES.CATEGORY, categoryName)
  handleNavigation(location)
}
