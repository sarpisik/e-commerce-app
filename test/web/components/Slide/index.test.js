import React from 'react'
import { Slide } from '../../../../src/web/components'
import { store } from '../helper'

describe('React Library', () => {
  describe('Slide component', () => {
    const products = store.getState().productsState['Consumer Electronics']
    const props = {
      products
    }
    shallow(<Slide {...props} />)
  })
})

// todo: custom prop with storec
// const image = new Image()
