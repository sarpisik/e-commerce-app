import { connect } from 'react-redux'
import * as ACTIONS from '../../constants/session'
import { LoginForm } from '../../components'

const mapDispatchToProps = dispatch => ({
  handleLogin: authUser =>
    dispatch({
      type: ACTIONS.SIGN_IN_SUCCESS,
      authUser
    }),
  handleSessionId: sessionId =>
    dispatch({
      type: ACTIONS.SESSION_ID,
      sessionId
    })
})

export default connect(
  null,
  mapDispatchToProps
)(LoginForm)
