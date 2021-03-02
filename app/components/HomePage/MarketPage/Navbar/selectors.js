import { createSelector } from 'reselect';

const selectKeys = state => {
  const { summaryListType } = state.global;
  switch (summaryListType) {
    case 'upcoming':
      return state.marketUpcoming.keys;
    case 'result':
      return state.marketResult.keys;
    default:
      return [];
  }
};

const makeTabs = createSelector(
  selectKeys,
  state => {
    const result = [];
    Object.entries(state).forEach(([key, value]) => {
      result.push({ id: key, name: value.name });
    });
    return result;
  },
);

export { makeTabs };
