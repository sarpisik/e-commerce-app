import React, { lazy } from 'react'
import * as ROUTES from '../../constants/routes'
import { extractStringQuery } from '../Helpers'

const Pages = {
  [ROUTES.CATEGORIES]: lazy(() =>
    import(/* webpackChunkName: "CategoriesPage" */ '../../pages/categories')
  ),
  [ROUTES.CATEGORY]: lazy(() =>
    import(
      /* webpackChunkName: "CategoryPage" */ '../../containers/categoryPage'
    )
  ),
  [ROUTES.PRODUCT]: lazy(() =>
    import(/* webpackChunkName: "ProductPage" */ '../../pages/product')
  ),
  [ROUTES.SESSION]: lazy(() =>
    import(/* webpackChunkName: "LoginPage" */ '../../pages/login')
  )
}

const PageLoader = props => {
  const Component = Pages[props.match.params.pageId]
  const searchQuery = extractStringQuery(props.location.search)
  return <Component {...searchQuery} {...props} />
}

export default PageLoader
