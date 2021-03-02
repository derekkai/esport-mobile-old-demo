import produce from 'immer';
import { gamelistSubscribeHandler, gamelistDateHandler } from 'helpers/common';

const prefix = 'live';
const SET_CURRENT_SELECT_GAME_ID = `${prefix}/SET_CURRENT_SELECT_GAME_ID`;
const UPDATE_LIVE_DATA = `${prefix}/UPDATE_LIVE_DATA`;
export const REQUEST_LIVE_DATA = `${prefix}/REQUEST_LIVE_DATA`;
const SET_LIVE_DATA = `${prefix}/SET_LIVE_DATA`;

/**
 * Set current live select game id.
 * @param {number} payload game id
 */
export const setCurrentSelectGameId = payload => ({
  type: SET_CURRENT_SELECT_GAME_ID,
  payload,
});

/**
 * Update live data.
 * @param {Object} payload update data.
 */
export const updateLiveData = payload => ({
  type: UPDATE_LIVE_DATA,
  payload,
});

/**
 * Request live data.
 */
export const requestLiveData = () => ({
  type: REQUEST_LIVE_DATA,
});

/**
 * Set live data.
 * @param {Object} payload live data.
 */
export const setLiveData = payload => ({
  type: SET_LIVE_DATA,
  payload,
});

const initalState = {
  currentSelectGameId: '',
  keys: [],
  entity: {},
};

/* eslint-disable default-case, no-param-reassign */
export default (state = initalState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_LIVE_DATA: {
        let defaultSelect = '';
        let firstGameId;
        const gameArray = Object.values(action.payload.game);
        for (let i = 0; i < gameArray.length; i += 1) {
          if (firstGameId && defaultSelect) break;
          if (!firstGameId) firstGameId = gameArray[i].id;
          if (!defaultSelect && gameArray[i].video_url) {
            defaultSelect = gameArray[i].id;
          }
        }
        if (defaultSelect !== '') defaultSelect = firstGameId;
        draft.currentSelectGameId = defaultSelect;
        gamelistDateHandler(draft, action.payload, false);
        break;
      }
      case SET_CURRENT_SELECT_GAME_ID:
        draft.currentSelectGameId = action.payload;
        break;
      case UPDATE_LIVE_DATA: {
        gamelistSubscribeHandler(draft, action.payload, false);
        if (!draft.keys.includes(draft.currentSelectGameId)) {
          if (draft.keys.length > 0) {
            [draft.currentSelectGameId] = draft.keys;
          } else {
            draft.currentSelectGameId = '';
          }
        }
        break;
      }
    }
  });
