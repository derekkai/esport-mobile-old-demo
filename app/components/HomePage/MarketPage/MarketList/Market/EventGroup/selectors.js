import { createSelector } from 'reselect';
import { pushIdBySort } from 'helpers/common';

const selectEvent = (state, ownProps) => {
  const { summaryListType } = state.global;
  const { marketId } = ownProps;

  switch (summaryListType) {
    case 'upcoming':
      return state.marketUpcoming.entity[marketId].event || [];
    case 'result':
      return state.marketResult.entity[marketId].event || [];
    default:
      return {};
  }
};

const makeEvents = () =>
  createSelector(
    selectEvent,
    state => {
      const ids = [];
      Object.values(state).forEach(event => {
        pushIdBySort(state, event, ids, 'order');
      });
      return ids;
    },
  );

const makeEventResult = () =>
  createSelector(
    selectEvent,
    state => {
      const firstEvent = Object.values(state)[0];
      if (firstEvent) return firstEvent.result;
      return undefined;
    },
  );

export { makeEvents, makeEventResult };
