import sessionReducer from '../../../../../src/web/state/reducers/session'
import * as ACTIONS from '../../../../../src/web/constants/session'

describe('Redux session reducer', () => {
  it('should return the initial state', () => {
    expect(sessionReducer(undefined, {})).to.deep.equal({
      authUser: null
    })
  })
  it('should handle sign in success', () => {
    expect(
      sessionReducer(
        {},
        { type: ACTIONS.SIGN_IN_SUCCESS, authUser: 'testUser' }
      )
    ).to.deep.equal({
      authUser: 'testUser'
    })
  })
  it('should handle sign in error', () => {
    expect(
      sessionReducer(undefined, {
        type: ACTIONS.SIGN_IN_FAILURE,
        error: 'The user does not exist'
      })
    ).to.deep.equal({
      authUser: null
    })
  })
})
