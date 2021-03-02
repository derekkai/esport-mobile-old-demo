import { createSelector } from 'reselect';
import { betslipTotalPrice } from 'helpers/common';

const selectData = (state, props) => state.betslip.entity[props.eventId];
const selectBetType = state => state.betslip.betType;

const makePotentialWin = () =>
  createSelector(
    selectBetType,
    selectData,
    (betType, data) => {
      const { price, stake } = data;
      const totalPrice = betslipTotalPrice(betType, [price]).price;
      return Number((totalPrice * stake).toFixed(2));
    },
  );

export { makePotentialWin };
