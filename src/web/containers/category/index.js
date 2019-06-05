import { connect } from 'react-redux'
import { Category } from '../../components'

export const mapStateToProps = ({ productsState }, { categoryName }) => ({
  category: productsState[categoryName]
})

export default connect(mapStateToProps)(Category)
