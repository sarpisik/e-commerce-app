import React, { Component, Suspense } from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import * as ROUTES from './constants/routes'

import { Home } from './containers'
import { Header, PageLoader, Spinner } from './components'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import {
  faStar as faStarRegular,
  faHeart as faHeartRegular
} from '@fortawesome/free-regular-svg-icons'
import {
  faHome,
  faShoppingCart,
  faUser,
  faDolly,
  faSearch,
  faTh,
  faEnvelope,
  faStar as faStarSolid,
  faHeart as faHeartSolid,
  faStarHalfAlt
} from '@fortawesome/free-solid-svg-icons'

// Create library of icons to use on links
library.add(
  fab,
  faHome,
  faShoppingCart,
  faUser,
  faDolly,
  faSearch,
  faTh,
  faEnvelope,
  faStarRegular,
  faStarSolid,
  faHeartRegular,
  faHeartSolid,
  faStarHalfAlt
)

class App extends Component {
  render() {
    const { match } = this.props
    return (
      <>
        <Header />
        <Suspense fallback={<Spinner />}>
          <Switch>
            <Route exact path={ROUTES.HOME} component={Home} />
            <Route path={`${match.path}:pageId`} component={PageLoader} />
          </Switch>
        </Suspense>
      </>
    )
  }
}

export default withRouter(App)
