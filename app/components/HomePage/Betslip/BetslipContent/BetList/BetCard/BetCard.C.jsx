import { connect } from 'react-redux';
import component from './BetCard';

const mapStateToProps = (state, props) => {
  return {
    betType: state.betslip.betType,
    status: state.betslip.entity[props.eventId]?.status,
  };
};

export default connect(mapStateToProps)(component);
