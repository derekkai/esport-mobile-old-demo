import { connect } from 'react-redux';
import component from './Toolbar';

const mapStateToProps = (state, props) => {
  const { navId } = props;
  let fromDateTimeStamp;
  let toDateTimeStamp;
  if (navId === 'betHistory') {
    fromDateTimeStamp = state.betHistory.dateRange.from;
    toDateTimeStamp = state.betHistory.dateRange.to;
  } else {
    fromDateTimeStamp = state.balanceHistory.dateRange.from;
    toDateTimeStamp = state.balanceHistory.dateRange.to;
  }
  return {
    fromDateTimeStamp,
    toDateTimeStamp,
  };
};

export default connect(mapStateToProps)(component);
