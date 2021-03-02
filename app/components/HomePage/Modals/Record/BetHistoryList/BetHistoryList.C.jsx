import { connect } from 'react-redux';
import { requestBetHistory, clearBetHistory } from 'reducers/betHistory';
import component from './BetHistoryList';

const mapStateToProps = state => ({
  entity: state.betHistory.entity,
  loading: state.global.loading.betHistory,
});

const mapDispatchToProps = dispatch => ({
  requestBetHistory: param => dispatch(requestBetHistory(param)),
  clearBetHistory: () => dispatch(clearBetHistory()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(component);
