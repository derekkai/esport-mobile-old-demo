import { connect } from 'react-redux';
import { updateStake, setSystemNum, setSystemBetCount } from 'reducers/betslip';
import { openKeyBoard, setKeyBoardHandleFunc } from 'reducers/global';
import component from './SystemFooter';
import { makeBetslipInfo } from './selectors';

const mapStateToProps = state => {
  const { systemNumSelectItem, count, price } = makeBetslipInfo(state);
  return {
    count,
    price,
    stake: state.betslip.stake,
    betType: state.betslip.betType,
    systemNum: state.betslip.systemNum,
    systemNumSelectItem,
  };
};

const mapDispatchToProps = dispatch => ({
  setSystemBetCount: param => dispatch(setSystemBetCount(param)),
  setKeyBoardHandleFunc: param => dispatch(setKeyBoardHandleFunc(param)),
  openKeyBoard: param => dispatch(openKeyBoard(param)),
  updateStake: param => dispatch(updateStake(param)),
  setSystemNum: param => dispatch(setSystemNum(param)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(component);
