import * as ACTIONS from '../../../constants/session'

export function getAuthUser(sessionObject) {
  return dispatch => {
    return fetch(process.env.API_AUTHUSER, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(sessionObject)
    })
      .then(response => response.json())
      .then(body => {
        dispatch({ type: ACTIONS.SIGN_IN_SUCCESS, body })
      })
      .catch(error =>
        dispatch({ type: ACTIONS.SIGN_IN_FAILURE, error: error.message })
      )
  }
}
