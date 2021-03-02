import produce from 'immer';
import { gamelistDateHandler, gamelistSubscribeHandler } from 'helpers/common';

const prefix = 'gameChampion';
const SET_GAME_CHAMPION_DATA = `${prefix}/SET_GAME_CHAMPION_DATA`;
const UPDATE_GAME_CHAMPION_DATA = `${prefix}/UPDATE_GAME_CHAMPION_DATA`;
const CLEAR_GAME_CHAMPION_DATA = `${prefix}/CLEAR_GAME_CHAMPION_DATA`;

/**
 * Set game champion data.
 * @param {Object} payload game champion data.
 */
export const setGameChampionData = payload => ({
  type: SET_GAME_CHAMPION_DATA,
  payload,
});

/**
 * Update game champion data.
 * @param {Object} payload game champion update data.
 */
export const updateGameChampionData = payload => ({
  type: UPDATE_GAME_CHAMPION_DATA,
  payload,
});

/**
 * Clear game champion data.
 */
export const clearGameChampionData = () => ({
  type: CLEAR_GAME_CHAMPION_DATA,
});

const initalState = {
  keys: [],
  entity: {},
};

/* eslint-disable default-case, no-param-reassign */
export default (state = initalState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_GAME_CHAMPION_DATA: {
        gamelistDateHandler(draft, action.payload, true);
        break;
      }
      case UPDATE_GAME_CHAMPION_DATA: {
        gamelistSubscribeHandler(draft, action.payload, true);
        break;
      }
      case CLEAR_GAME_CHAMPION_DATA: {
        draft.keys = [];
        draft.entity = {};
        break;
      }
    }
  });
