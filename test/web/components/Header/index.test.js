import React from 'react'
import Header, {
  Logo,
  NavList,
  SearchBar,
  CountryBar
} from '../../../../src/web/components/Header'
import { mountComponent } from '../helper'

describe('React Library', () => {
  describe('Header component', () => {
    it('renders Logo component', () => {
      expect(wrapper.find(Logo)).to.have.length(1)
    })
    const wrapper = mountComponent(<Header />)

    it('renders NavList component', () => {
      expect(wrapper.find(NavList)).to.have.length(1)
    })

    it('renders SearchBar component', () => {
      expect(wrapper.find(SearchBar)).to.have.length(1)
    })

    it('renders CountryBar component', () => {
      expect(wrapper.find(CountryBar)).to.have.length(1)
    })
  })
})
