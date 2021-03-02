import { connect } from 'react-redux';
import { setBalanceHistoryDateRange } from 'reducers/balanceHistory';
import { setBetHistoryDateRange } from 'reducers/betHistory';
import component from './DateRangeModal';
const mapStateToProps = (state, props) => {
  let fromDate;
  let toDate;
  if (props.navId === 'betHistory') {
    fromDate = state.betHistory.dateRange.from;
    toDate = state.betHistory.dateRange.to;
  } else {
    fromDate = state.balanceHistory.dateRange.from;
    toDate = state.balanceHistory.dateRange.to;
  }
  return {
    fromDate,
    toDate,
  };
};

const mapDispatchToProps = dispatch => ({
  setBalanceHistoryDateRange: param =>
    dispatch(setBalanceHistoryDateRange(param)),
  setBetHistoryDateRange: param => dispatch(setBetHistoryDateRange(param)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(component);
