import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { getAuthUser } from '../../../../../src/web/state/actions/session'
import * as ACTIONS from '../../../../../src/web/constants/session'
import fetchMock from 'fetch-mock'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('Redux Actions', () => {
  describe('getAuthUser', () => {
    afterEach(() => {
      fetchMock.restore()
    })

    it('should dispatch success action on resolved', done => {
      fetchMock.getOnce('testUrl', {
        body: {
          authUser: { name: 'testUser', session: 'testsession' }
        },
        headers: { 'content-type': 'application/json' }
      })

      const expectedActions = [
        {
          type: ACTIONS.SIGN_IN_SUCCESS,
          body: { authUser: { name: 'testUser', session: 'testsession' } }
        }
      ]
      const store = mockStore({ authUser: null })

      store.dispatch(getAuthUser('testUrl')).then(() => {
        compareStoreAndExpectedActions(store.getActions, expectedActions, done)
      })
    })
    it('should dispatch error action on rejected', done => {
      fetchMock.getOnce('testUrl', {
        throws: new Error('The user does not exist')
      })

      const expectedActions = [
        {
          type: ACTIONS.SIGN_IN_FAILURE,
          error: 'The user does not exist'
        }
      ]
      const store = mockStore({ authUser: null })

      store.dispatch(getAuthUser('testUrl')).then(() => {
        compareStoreAndExpectedActions(store.getActions, expectedActions, done)
      })
    })
  })
})

function compareStoreAndExpectedActions(storeActions, expectedActions, done) {
  if (expect(storeActions()).to.deep.equal(expectedActions)) {
    done()
  } else {
    done('actions must be equal')
  }
}
