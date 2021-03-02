import produce from 'immer';
import { gamelistSubscribeHandler, gamelistDateHandler } from 'helpers/common';

const prefix = 'recommandGame';
export const REQUEST_RECOMMAND_GAME_DATA = `${prefix}/REQUEST_RECOMMAND_GAME_DATA`;
const SET_RECOMMAND_GAME_DATA = `${prefix}/SET_RECOMMAND_GAME_DATA`;
const UPDATE_RECOMMAND_GAME_DATA = `${prefix}/UPDATE_RECOMMAND_GAME_DATA`;

/**
 * Request recommand game.
 */
export const requestRecommandGameData = () => ({
  type: REQUEST_RECOMMAND_GAME_DATA,
});

/**
 * Set recommand data.
 * @param {Object} payload recommand game data.
 */
export const setRecommandGameData = payload => ({
  type: SET_RECOMMAND_GAME_DATA,
  payload,
});

/**
 * Update recommand game data.
 * @param {Object} payload recommand game update data.
 */
export const updateRecommandGameData = payload => ({
  type: UPDATE_RECOMMAND_GAME_DATA,
  payload,
});

const initialState = {
  keys: [],
  entity: {},
};

/* eslint-disable default-case, no-param-reassign */
export default (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_RECOMMAND_GAME_DATA: {
        gamelistDateHandler(draft, action.payload, false);
        break;
      }
      case UPDATE_RECOMMAND_GAME_DATA: {
        gamelistSubscribeHandler(draft, action.payload, false);
      }
    }
  });
