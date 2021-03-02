import produce from 'immer';
import { gamelistSubscribeHandler, gamelistDateHandler } from 'helpers/common';

const prefix = 'gameUpcoming';
const SET_GAME_UPCOMING_DATA = `${prefix}/SET_GAME_UPCOMING_DATA`;
const CLEAR_GAME_UPCOMING_DATA = `${prefix}/CLEAR_GAME_UPCOMING_DATA`;
const UPDATE_GAME_UPCOMING_DATA = `${prefix}/UPDATE_GAME_UPCOMING_DATA`;

/**
 * Set game upcoming data.
 * @param {Object} payload game data
 */
export const setGameUpcomingData = payload => ({
  type: SET_GAME_UPCOMING_DATA,
  payload,
});

/**
 * Clear game upcoming data.
 */
export const clearGameUpcomingData = () => ({
  type: CLEAR_GAME_UPCOMING_DATA,
});

/**
 * Update game upcoming data.
 * @param {Object} payload new game data
 */
export const updateGameUpcomingData = payload => ({
  type: UPDATE_GAME_UPCOMING_DATA,
  payload,
});

const initalState = {
  keys: [],
  entity: {},
};

/* eslint-disable default-case, no-param-reassign */
export default (state = initalState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_GAME_UPCOMING_DATA: {
        gamelistDateHandler(draft, action.payload, true);
        break;
      }
      case CLEAR_GAME_UPCOMING_DATA:
        draft.keys = [];
        draft.entity = {};
        break;
      case UPDATE_GAME_UPCOMING_DATA: {
        gamelistSubscribeHandler(draft, action.payload, true);
        break;
      }
    }
  });
