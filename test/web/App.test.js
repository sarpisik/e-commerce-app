import React from 'react'

import App from '../../src/web/App'
import { Header } from '../../src/web/components'

describe('React Library', () => {
  describe('App component', () => {
    const shallowWrapper = shallow(<App />)
    it('should renders Header component', () => {
      expect(shallowWrapper.find(Header)).to.have.length(1)
    })
  })
})
