import React, { lazy } from 'react';
import * as ROUTES from '../../constants/routes';
import { extractStringQuery } from '../Helpers';
import CartPage from '../../pages/cart';

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
  [ROUTES.LOGIN]: lazy(() =>
    import(/* webpackChunkName: "LoginPage" */ '../../pages/login')
  ),
  [ROUTES.SIGN_UP]: lazy(() =>
    import(/* webpackChunkName: "SignUpPage" */ '../../pages/signUp')
  ),
  [ROUTES.CART]: CartPage
};

const PageLoader = props => {
  const Component = Pages[props.match.params.pageId];
  const searchQuery = extractStringQuery(props.location.search);
  return <Component {...searchQuery} {...props} />;
};

export default PageLoader;
