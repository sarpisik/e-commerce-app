import { connect } from 'react-redux'
import { Home } from '../../pages'

export const mapStateToProps = ({ authUser, productsState }) => ({
  authUser,
  productsState
})

export default connect(mapStateToProps)(Home)
