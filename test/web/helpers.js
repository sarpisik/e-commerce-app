import { expect } from 'chai'
import { mount, render, shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import sinon from 'sinon'
import products from '../../src/web/assets/data/products/productsByCategories.json'

configure({ adapter: new Adapter() })

global.expect = expect
global.sinon = sinon

global.mount = mount
global.render = render
global.shallow = shallow

global.products = products
