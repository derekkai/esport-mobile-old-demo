import { createSelector } from 'reselect';

const selectEvent = (state, ownProps) =>
  state.gameUpcoming.entity[ownProps.gameId].event;

const makePriceByEventName = name =>
  createSelector(
    selectEvent,
    state => {
      let result = 0;
      Object.values(state).forEach(event => {
        if (event.name.includes(name)) result = event.price;
      });
      return result;
    },
  );

const makeEventIdByEventName = name =>
  createSelector(
    selectEvent,
    state => {
      let result = 0;
      Object.values(state).forEach(event => {
        if (event.name.includes(name)) result = event.id;
      });
      return result;
    },
  );

export { makePriceByEventName, makeEventIdByEventName };
