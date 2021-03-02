import { createSelector } from 'reselect';

const selectEntity = state => state.betslip.entity;

const makeTotalData = () =>
  createSelector(
    selectEntity,
    state => {
      let totalSingleStake = 0;
      let totalPotentialWin = 0;
      let count = 0;
      Object.values(state).forEach(el => {
        totalSingleStake += el.stake;
        totalPotentialWin += el.potentialWin || 0;
        count += 1;
      });
      totalPotentialWin = Number(totalPotentialWin.toFixed(2));
      return { totalSingleStake, totalPotentialWin, count };
    },
  );

export { makeTotalData };
