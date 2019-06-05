import React from 'react'
import { withRouter, Link } from 'react-router-dom'
import * as ROUTES from '../../../constants/routes'
import { extractStringQuery, createLocation, parseToValue } from '../../Helpers'

const LinkToHome = () => <Link to={ROUTES.HOME}>/Home</Link>

const LinkToCategories = () => (
  <Link to={ROUTES.CATEGORIES} replace>
    /Categories
  </Link>
)

const returnBackSlashedRoute = route => '/' + route

const DynamicLink = ({ path, title, ...rest }) => (
  <span>
    <LinkToHome />
    <LinkToCategories />
    {path && (
      <Link to={path} {...rest}>
        {title}
      </Link>
    )}
  </span>
)

const DynamicLinks = ({ location }) => {
  if (location.search) {
    // If the route is a product page:
    // 1- parse the search query to display formatted product name.
    // 2- Create a path object to category of this product.
    if (location.pathname === returnBackSlashedRoute(ROUTES.PRODUCT)) {
      const searchQuery = extractStringQuery(location.search)
      const categoryLocation = createLocation(ROUTES.CATEGORY, searchQuery.cat)
      const formattedQuery = parseToValue(searchQuery.cat)
      return (
        <DynamicLink
          path={categoryLocation}
          title={returnBackSlashedRoute(formattedQuery)}
        />
      )
    }
    // Else, the route is a category page so:
    // 1- parse the search query to display formatted category name.
    // 2- Create a path object to category itself.
    // 3- Replace history stack on click.
    const categoryPath = location.search.slice(1)
    const categoryName = parseToValue(categoryPath)
    const direction = createLocation(ROUTES.CATEGORY, categoryPath)
    return (
      <DynamicLink
        path={direction}
        title={returnBackSlashedRoute(categoryName)}
        replace
      />
    )
    // Else if the route is the categories page, replace history stack on click.
  } else if (location.pathname !== ROUTES.HOME) {
    return <DynamicLink />
  }
  // Else, display home link only.
  return (
    <span>
      <LinkToHome />
    </span>
  )
}

const RouteBar = props => {
  return (
    <>
      <span className="text-white">Your are here: </span>
      <DynamicLinks {...props} />
    </>
  )
}

export default withRouter(RouteBar)
