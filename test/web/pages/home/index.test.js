import React from 'react'
import { Categories } from '../../../../src/web/containers'
import { Jumbotron, Slide } from '../../../../src/web/components'
import { Home } from '../../../../src/web/pages'

describe('React Library', () => {
  describe('Home component', () => {
    const shallowWrapper = shallow(
      <Home authUser={false} productsState={products} />
    )
    it('should renders Jumbotron component, If the user NOT logged in', () => {
      expect(shallowWrapper.find(Jumbotron)).to.have.length(1)
    })

    it('should NOT renders Jumbotron component, If the user logged in', () => {
      shallowWrapper.setProps({ authUser: true })
      expect(shallowWrapper.find(Jumbotron)).to.have.length(0)
    })

    it('should renders Slide component', () => {
      // console.log(shallowWrapper.instance().props)
      expect(shallowWrapper.find(Slide)).to.have.length(1)
    })

    it('should renders Categories component', () => {
      expect(shallowWrapper.find(Categories)).to.have.length(1)
    })
  })
})
