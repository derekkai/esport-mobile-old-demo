import { createSelector } from 'reselect';

const selectBetType = state => state.betslip.betType;
const selectEntity = state => state.betslip.entity;
const selectStake = state => state.betslip.stake;

const makeIsBetStakeCorrent = createSelector(
  selectBetType,
  selectEntity,
  selectStake,
  (betType, entity, stake) => {
    let result = true;
    const temp = Object.values(entity);
    if (betType !== 'single' && (stake === '' || stake === '0')) {
      result = false;
    } else {
      for (let i = 0; i < temp.length; i += 1) {
        const bet = temp[i];
        if (bet.status === 'close') {
          result = false;
          break;
        } else if (betType === 'single' && bet.stake === 0) {
          result = false;
          break;
        }
      }
    }
    return result;
  },
);

export { makeIsBetStakeCorrent };
