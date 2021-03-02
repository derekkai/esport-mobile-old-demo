import { connect } from 'react-redux';
import { removeBetsKey } from 'reducers/betslip';
import componet from './SystemBetCard';

const mapStateToProps = (state, props) => {
  const info = state.betslip.entity[props.eventId];
  return {
    gameId: info.gameId,
    oddName: info.oddName,
    price: info.price,
    marketType: info.marketType,
    pick: info.pick,
    status: info.status,
    time: info.time,
    reason: info.reason,
  };
};

const mapDispatchToProps = dispatch => ({
  removeBetsKey: param => dispatch(removeBetsKey(param)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(componet);
