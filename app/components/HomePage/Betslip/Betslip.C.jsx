import { connect } from 'react-redux';
import { closeModal } from 'reducers/global';
import { resetBetslip, requestUpdateBetEventData } from 'reducers/betslip';
import component from './Betslip';

const mapStateToProps = state => ({
  showResult: state.betslip.showResult,
  isSuccess: state.betslip.isSuccess,
  isLogin: state.account.isLogin,
  balance: state.account.balance,
  betCount: state.betslip.keys.length,
  isSafariBrowser: state.global.isSafariBrowser,
  isWaitingResponse: state.betslip.isWaitingResponse,
  failCode: state.betslip.failCode,
  modal: state.global.modal,
});

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(closeModal()),
  resetBetslip: () => dispatch(resetBetslip()),
  requestUpdateBetEventData: () => dispatch(requestUpdateBetEventData()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(component);
