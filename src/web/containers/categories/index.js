import { connect } from 'react-redux'
import { mapCategoriesListToProps } from '../helpers'
import { Categories } from '../../components'

export default connect(mapCategoriesListToProps)(Categories)
