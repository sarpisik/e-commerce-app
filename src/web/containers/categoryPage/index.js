import { connect } from 'react-redux'
import CategoryPage from '../../pages/category'

const mapStateToProps = ({ productsState }, { location }) => {
  const categoryName = location.search.slice(1)

  return {
    productsList: productsState[categoryName]
  }
}

export default connect(mapStateToProps)(CategoryPage)
