import React, { lazy } from 'react';
import * as ROUTES from '../../constants/routes';
import { extractStringQuery } from '../Helpers';

import { Container } from 'react-bootstrap';
import './index.css';

const Pages = {
  [ROUTES.CATEGORIES]: lazy(() =>
    import(/* webpackChunkName: "CategoriesPage" */ '../../pages/categories')
  ),
  [ROUTES.CATEGORY]: lazy(() =>
    import(/* webpackChunkName: "CategoryPage" */ '../../pages/category')
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
  [ROUTES.CART]: lazy(() =>
    import(/* webpackChunkName: "CartPage" */ '../../pages/cart')
  ),
  [ROUTES.ACCOUNT]: lazy(() =>
    import(/* webpackChunkName: "AccountPage" */ '../../pages/account')
  ),
  [ROUTES.SEARCH]: lazy(() =>
    import(/* webpackChunkName: "SearchPage" */ '../../pages/search')
  )
};

const PageLoader = props => {
  const Component = Pages[props.match.params.pageId];
  const searchQuery = extractStringQuery(props.location.search);
  return (
    <Container className="page d-flex flex-column justify-content-center">
      <Component search={searchQuery} {...searchQuery} {...props} />
    </Container>
  );
};

export default PageLoader;
