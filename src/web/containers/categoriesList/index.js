import { connect } from 'react-redux'
import { mapCategoriesListToProps } from '../helpers'
import { SideBarList } from '../../components'

export default connect(mapCategoriesListToProps)(SideBarList)
