import { connect } from 'react-redux';
import component from './Header';

const mapStateToProps = state => ({
  loadDown:
    state.global.loadDown.battleHeader && state.global.loadDown.classifier,
});

export default connect(mapStateToProps)(component);
