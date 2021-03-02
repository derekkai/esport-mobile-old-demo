import { connect } from 'react-redux';
import { addBet, removeBet } from 'reducers/betslip';
import component from './Odds';

const mapStateToProps = (state, props) => ({
  isInBetslip: state.betslip.keys.includes(props.eventId),
});

const mapDispatchToProps = dispatch => ({
  addBet: param => dispatch(addBet(param)),
  removeBet: param => dispatch(removeBet(param)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(component);
