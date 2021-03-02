import { createSelector } from 'reselect';
import { betslipTotalPrice, getBetslipOnlySystemCount } from 'helpers/common';

const selectEntity = state => state.betslip.entity;
const selectkeys = state => state.betslip.keys;
const selectBetType = state => state.betslip.betType;
const selectSystemNum = state => state.betslip.systemNum;

const makeBetslipInfo = createSelector(
  selectEntity,
  selectkeys,
  selectBetType,
  selectSystemNum,
  (entity, keys, betType, systemNum) => {
    const betCount = keys.length;
    const eventsPrice = [];
    const systemPriceList = [];
    Object.values(entity).forEach(el => {
      eventsPrice.push(el.price);
    });

    for (let i = 2; i < betCount; i += 1) {
      const count = getBetslipOnlySystemCount(betCount, i);
      systemPriceList.push({ count });
    }

    const systemNumSelectItem = [];
    systemPriceList.forEach((el, key) => {
      systemNumSelectItem.push({
        label: '{0} as 1, {1} bets',
        labelValues: { 0: key + 2, 1: el.count },
        value: key + 2,
      });
    });

    let count = 0;
    let price = 0;
    if (betType === 'system') {
      let systems;
      ({ price, systems } = betslipTotalPrice(
        'system',
        eventsPrice,
        systemNum,
      ));
      count = systems.length;
    } else {
      ({ price } = betslipTotalPrice('multiple', eventsPrice));
    }

    return {
      systemNumSelectItem,
      count,
      price,
    };
  },
);

export { makeBetslipInfo };
