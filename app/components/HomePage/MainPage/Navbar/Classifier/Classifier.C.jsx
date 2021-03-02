import { connect } from 'react-redux';
import {
  requestClassifierData,
  resetClassifierSelection,
} from 'reducers/classifier';
import { makeKeys } from './selectors';
import component from './Classifier';

const mapStateToProps = state => ({
  casualSelect: state.classifier.casualSelect,
  keys: makeKeys(state),
  summaryListType: state.global.summaryListType,
  loadDown: state.global.loadDown.classifier,
});

const mapDispatchToProps = dispatch => ({
  resetClassifierSelection: () => dispatch(resetClassifierSelection()),
  requestClassifierData: () => dispatch(requestClassifierData()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(component);
