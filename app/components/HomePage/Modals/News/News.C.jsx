import { connect } from 'react-redux';
import component from './News';

const mapStateToProps = state => ({
  entity: state.news.entity,
});

export default connect(mapStateToProps)(component);
