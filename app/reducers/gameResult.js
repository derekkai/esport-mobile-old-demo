import produce from 'immer';
import { pushIdBySort } from 'helpers/common';

const prefix = 'gameResult';
const SET_GAME_RESULT_DATA = `${prefix}/SET_GAME_RESULT_DATA`;
const CLEAR_GAME_RESULT_DATA = `${prefix}/CLEAR_GAME_RESULT_DATA`;

/**
 * Set game result data.
 * @param {Object} payload game data
 */
export const setGameResultData = payload => ({
  type: SET_GAME_RESULT_DATA,
  payload,
});

/**
 * Clear game result data.
 */
export const clearGameResultData = () => ({
  type: CLEAR_GAME_RESULT_DATA,
});

const initalState = {
  keys: [],
  entity: {},
};

/* eslint-disable default-case, no-param-reassign */
export default (state = initalState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_GAME_RESULT_DATA: {
        const gameArray = Object.values(action.payload.game);
        const keys = [];
        for (let i = 0; i < gameArray.length; i += 1) {
          const game = gameArray[i];
          pushIdBySort(action.payload.game, game, keys, 'start_ts', false);
        }
        draft.entity = {
          ...state.entity,
          ...action.payload.game,
        };
        draft.keys = [...state.keys, ...keys];
        break;
      }
      case CLEAR_GAME_RESULT_DATA:
        draft.keys = [];
        draft.entity = {};
        break;
    }
  });
