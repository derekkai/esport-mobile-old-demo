import { connect } from 'react-redux';
import { setPriceChangeHandleType } from 'reducers/betslip';
import component from './BetslipHeader';

const mapStateToProps = state => ({
  betCount: state.betslip.keys.length,
  priceChangeHandleType: state.betslip.priceChangeHandleType,
});

const mapDispatchToProps = dispatch => ({
  setPriceChangeHandleType: param => dispatch(setPriceChangeHandleType(param)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(component);
