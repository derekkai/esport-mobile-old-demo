import { connect } from 'react-redux';
import { setClassifierCasualSelect } from 'reducers/classifier';
import component from '../Item/Item';
import { makeAllCount } from './selectors';

const mapStateToProps = state => ({
  gameCount: makeAllCount(state),
  active: state.classifier.casualSelect === 'all',
});

const mapDispatchToProps = dispatch => ({
  setClassifierCasualSelect: param =>
    dispatch(setClassifierCasualSelect(param)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(component);
