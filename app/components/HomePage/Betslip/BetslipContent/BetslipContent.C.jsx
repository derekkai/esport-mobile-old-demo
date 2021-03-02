import { connect } from 'react-redux';
import {
  setBetType,
  setOddsFormat,
  clearBetslipData,
  removeBetsKey,
} from 'reducers/betslip';
import component from './BetslipContent';

const mapStateToProps = state => ({
  betType: state.betslip.betType,
  oddsFormat: state.betslip.oddsFormat,
  keys: state.betslip.keys,
});

const mapDispatchToProps = dispatch => ({
  removeBetsKey: param => dispatch(removeBetsKey(param)),
  setBetType: param => dispatch(setBetType(param)),
  setOddsFormat: param => dispatch(setOddsFormat(param)),
  clearBetslipData: () => dispatch(clearBetslipData()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(component);
