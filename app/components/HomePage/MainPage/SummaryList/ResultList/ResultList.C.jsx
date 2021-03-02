import { connect } from 'react-redux';
import { clearGameResultData } from 'reducers/gameResult';
import component from './ResultList';

const mapStateToProps = state => ({
  loading:
    !state.global.loadDown.summaryList ||
    state.global.loading.classifier ||
    !state.global.loadDown.classifier,
  keys: state.gameResult.keys,
});

const mapDispatchToProps = dispatch => ({
  clearGameResultData: () => dispatch(clearGameResultData()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(component);
