import { connect } from 'react-redux';
import {
  addBet,
  removeBetsKey,
  requestUpdateBetEventData,
} from 'reducers/betslip';
import component from './Odds';

const mapStateToProps = (state, props) => ({
  isInBetslip: state.betslip.keys.includes(props.eventId),
});

const mapDispathToProps = dispatch => ({
  addBet: param => dispatch(addBet(param)),
  removeBetsKey: param => dispatch(removeBetsKey(param)),
  requestUpdateBetEventData: () => dispatch(requestUpdateBetEventData()),
});

export default connect(
  mapStateToProps,
  mapDispathToProps,
)(component);
