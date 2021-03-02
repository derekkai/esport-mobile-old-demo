import { connect } from 'react-redux';
import component from './Item';

const mapStateToProps = (state, props) => {
  const { count, total, balance } = state.balanceHistory.entity[props.date];
  return {
    count,
    total,
    balance,
  };
};

export default connect(mapStateToProps)(component);
