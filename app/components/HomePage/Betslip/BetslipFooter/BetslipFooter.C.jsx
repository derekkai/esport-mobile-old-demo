import { connect } from 'react-redux';
import { requestDoBet } from 'reducers/betslip';
import component from './BetslipFooter';
import { makeIsBetStakeCorrent } from './selectors';

const mapStateToProps = state => ({
  isWaitingResponse: state.betslip.isWaitingResponse,
  showResult: state.betslip.showResult,
  isBetStakeCorrent: makeIsBetStakeCorrent(state),
  isLogin: state.account.isLogin,
  priceNeverChange: state.betslip.priceNeverChange,
  priceChangeHandleType: state.betslip.priceChangeHandleType,
});

const mapDispatchToProps = dispatch => ({
  requestDoBet: () => dispatch(requestDoBet()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(component);
