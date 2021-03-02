import produce from 'immer';
import { createDateRange } from 'helpers/common';
import settings from 'settings';

const prefix = 'betHistory';

export const REQUEST_BET_HISTORY = `${prefix}/REQUEST_BET_HISTORY`;
const SET_BET_HISTORY = `${prefix}/SET_BET_HISTORY`;
export const SET_BET_HISTORY_RANGE = `${prefix}/SET_BET_HISTORY_RANGE`;
const CLEAR_BET_HISTORY = `${prefix}/CLEAR_BET_HISTORY`;

/**
 * Request bet history data.
 */
export const requestBetHistory = () => ({
  type: REQUEST_BET_HISTORY,
});

/**
 * Set bet history data.
 * @param {Object} payload bet history data
 */
export const setBetHistory = payload => ({
  type: SET_BET_HISTORY,
  payload,
});

/**
 * Set bet history date range.
 * @param {Object} payload date range data.
 * @param {number} payload.from from date of range.
 * @param {number} payload.to end date of range.
 */
export const setBetHistoryDateRange = payload => ({
  type: SET_BET_HISTORY_RANGE,
  payload,
});

/**
 * Clear balance history data.
 */
export const clearBetHistory = () => ({
  type: CLEAR_BET_HISTORY,
});

export const initalState = {
  entity: [],
  dateRange: createDateRange(true, settings.betHistoryDefaultDateRange),
};

/* eslint-disable default-case, no-param-reassign */
export default (state = initalState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_BET_HISTORY: {
        draft.entity = action.payload;
        break;
      }
      case SET_BET_HISTORY_RANGE: {
        const { startDate, endDate } = action.payload;
        draft.dateRange.from = startDate;
        draft.dateRange.to = endDate;
        break;
      }
      case CLEAR_BET_HISTORY:
        draft.entity = [];
        break;
    }
  });
