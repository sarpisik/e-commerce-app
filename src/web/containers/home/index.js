import { connect } from 'react-redux';
import { Home } from '../../pages';

export const mapStateToProps = ({ productsState }) => ({
  productsState
});

export default connect(mapStateToProps)(Home);
