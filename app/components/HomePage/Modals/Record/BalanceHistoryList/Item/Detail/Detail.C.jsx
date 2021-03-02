import { connect } from 'react-redux';
import component from './Detail';

const mapStateToProps = (state, props) => {
  const { data, total, balance } = state.balanceHistory.entity[props.date];
  return {
    data,
    total,
    balance,
  };
};

export default connect(mapStateToProps)(component);
