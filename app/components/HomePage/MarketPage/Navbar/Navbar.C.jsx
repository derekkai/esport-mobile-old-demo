import { connect } from 'react-redux';
import component from './Navbar';
import { makeTabs } from './selectors';

const mapStateToProps = state => ({
  tabs: makeTabs(state),
});

export default connect(mapStateToProps)(component);
