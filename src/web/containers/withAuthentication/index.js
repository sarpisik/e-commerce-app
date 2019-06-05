import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import * as ROUTES from '../../constants/routes'

const mapStateToProps = ({ sessionState }) => {
  const authUser = sessionState.authUser
  return { authUser }
}

const withAuthentication = props => Component => {
  const { authUser, history } = props
  // If the user logged in, render the navigated page.
  // Else, navigate to login page.
  if (authUser) {
    return <Component {...props} />
  }
  return history.push(ROUTES.SESSION)
}

export default connect(mapStateToProps)(withRouter(withAuthentication))
