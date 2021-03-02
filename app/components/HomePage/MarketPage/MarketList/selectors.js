import { createSelector } from 'reselect';

const selectKeys = (state, props) => {
  const { summaryListType } = state.global;
  const { id } = props;
  switch (summaryListType) {
    case 'upcoming':
      return state.marketUpcoming.keys[id].value;
    case 'result':
      return state.marketResult.keys[id].value;
    default:
      return [];
  }
};

const selectEntity = state => {
  const { summaryListType } = state.global;
  switch (summaryListType) {
    case 'upcoming':
      return state.marketUpcoming.entity;
    case 'result':
      return state.marketResult.entity;
    default:
      return {};
  }
};

const makeMarketData = createSelector(
  selectKeys,
  selectEntity,
  (keys, entity) => {
    const data = {};
    keys.forEach(marketId => {
      const { market_type, name, base } = entity[marketId];
      const key = `${market_type}${name}`;
      if (!data[key]) {
        data[key] = {
          market_type,
          name,
          markets: { [base]: marketId },
        };
      } else {
        data[key].markets[base] = marketId;
      }
    });
    return Object.values(data);
  },
);

export { makeMarketData };
