import { connect } from 'react-redux';
import {
  requestBalanceHistory,
  clearBalanceHistory,
} from 'reducers/balanceHistory';
import component from './BalanceHistoryList';

const mapStateToProps = state => ({
  keys: state.balanceHistory.keys,
  loading: state.global.loading.balanceHistory,
});

const mapDispatchToProps = dispatch => ({
  requestBalanceHistory: () => dispatch(requestBalanceHistory()),
  clearBalanceHistory: () => dispatch(clearBalanceHistory()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(component);
