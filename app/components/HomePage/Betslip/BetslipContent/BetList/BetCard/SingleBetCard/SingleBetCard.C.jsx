import { connect } from 'react-redux';
import {
  removeBetsKey,
  updateSingleStake,
  setPotentialWin,
} from 'reducers/betslip';
import { openKeyBoard, setKeyBoardHandleFunc } from 'reducers/global';
import component from './SingleBetCard';
import { makePotentialWin } from './selectors';

const makeMapStateToProps = () => {
  const getPotentialWin = makePotentialWin();
  const mapStateToProps = (state, props) => {
    const info = state.betslip.entity[props.eventId];
    return {
      oddName: info.oddName,
      price: info.price,
      pick: info.pick,
      marketType: info.marketType,
      stake: info.stake,
      time: info.time,
      gameId: info.gameId,
      potentialWin: getPotentialWin(state, props),
    };
  };
  return mapStateToProps;
};

const mapDispatchToProps = dispatch => ({
  setKeyBoardHandleFunc: param => dispatch(setKeyBoardHandleFunc(param)),
  openKeyBoard: param => dispatch(openKeyBoard(param)),
  removeBetsKey: param => dispatch(removeBetsKey(param)),
  updateSingleStake: param => dispatch(updateSingleStake(param)),
  setPotentialWin: param => dispatch(setPotentialWin(param)),
});

export default connect(
  makeMapStateToProps,
  mapDispatchToProps,
)(component);
