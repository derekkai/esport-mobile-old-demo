import produce from 'immer';
import extend from 'extend';
import { createDateRange, ObjectFind } from 'helpers/common';
import settings from 'settings';

const prefix = 'global';
export const PUSH_TEST_DATA = `${prefix}/PUSH_TEST_DATA`;
export const SET_LOADING_STATUS = `${prefix}/SET_LOADING_STATUS`;
export const REQUEST_MARKET_GAMEINFO = `${prefix}/REQUEST_MARKET_GAMEINFO`;
export const SET_SUMMARY_LIST_TYPE = `${prefix}/SET_SUMMARY_LIST_TYPE`;
export const SET_MAIN_DATA_VIEW_POINT = `${prefix}/SET_MAIN_DATA_VIEW_POINT`;
export const REQUEST_NEXT_SUMMARY_LIST_DATA = `${prefix}/REQUEST_NEXT_SUMMARY_LIST_DATA`;
export const RQEUEST_SUMMARY_LIST_DATA = `${prefix}/RQEUEST_SUMMARY_LIST_DATA`;
export const REQUEST_MARKET_LIST_DATA = `${prefix}/REQUEST_MARKET_LIST_DATA`;
export const SET_SUMMARY_DATE_RANGE = `${prefix}/SET_SUMMARY_DATE_RANGE`;
export const RUN_TRANSITION = `${prefix}/RUN_TRANSITION`;
const RESET_SUMMARY_LIST_DATE_RANGE = `${prefix}/RESET_SUMMARY_LIST_DATE_RANGE`;
const CLOSE_MODAL = `${prefix}/CLOSE_MODAL`;
const OPEN_MODAL = `${prefix}/OPEN_MODAL`;
const CLEAR_MARKET_GAMEINFO = `${prefix}/CLEAR_MARKET_GAMEINFO`;
const SET_MARKET_GAMEINFO = `${prefix}/SET_MARKET_GAMEINFO`;
const SET_TRANSITIONS_STEP = `${prefix}/SET_TRANSITIONS_STEP`;
const CLEAR_TRANSITIONS_STEP = `${prefix}/CLEAR_TRANSITIONS_STEP`;
const SET_MARKET_GAMEINFO_GAMEID = `${prefix}/SET_MARKET_GAMEINFO_GAMEID`;
export const REQUEST_ID_NAME_MAP = `${prefix}/REQUEST_ID_NAME_MAP`;
export const INITAL_APP = `${prefix}/INITAL_APP`;
const UPDATE_MARKET_GAME_INFO = `${prefix}/UPDATE_MARKET_GAME_INFO`;
const CLEAR_LOADDOWN_STATUS = `${prefix}/CLEAR_LOADDOWN_STATUS`;
const OPEN_KEYBOARD = `${prefix}/OPEN_KEYBOARD`;
const SET_KEYBOARD_HANDLE_FUNC = `${prefix}/SET_KEYBOARD_HANDLE_FUNC`;
const SET_SUMMARY_ITEM_RENDER_COUNT = `${prefix}/SET_SUMMARY_ITEM_RENDER_COUNT`;

export const initalApp = () => ({
  type: INITAL_APP,
});
/**
 * Open/close modal.
 * @param {string} payload : modal name
 */
export const openModal = payload => ({
  type: OPEN_MODAL,
  payload,
});

export const closeModal = payload => ({
  type: CLOSE_MODAL,
  payload,
});

/**
 * Set summary list type.
 * @param {string} payload : type name
 */
export const setSummaryListType = payload => ({
  type: SET_SUMMARY_LIST_TYPE,
  payload,
});

export const setSummaryDateRange = payload => ({
  type: SET_SUMMARY_DATE_RANGE,
  payload,
});

/**
 * Request Summary list data.
 */
export const requestSummaryListData = () => ({
  type: RQEUEST_SUMMARY_LIST_DATA,
});

/**
 * Request Market list data.
 */
export const requestMarketListData = () => ({
  type: REQUEST_MARKET_LIST_DATA,
});

/**
 * Set Data View point.
 * @param {string} payload: data view point.
 */
export const setMainDataViewPoint = payload => ({
  type: SET_MAIN_DATA_VIEW_POINT,
  payload,
});

/**
 * Set UI loading status.
 * @param {Object} payload
 * @param {string} payload.name: ui name
 * @param {string} payload.value: status
 */
export const setLoadingStatus = payload => ({
  type: SET_LOADING_STATUS,
  payload,
});

/**
 * Set game id.
 * @param {string} payload game id
 */
export const setMarketGameInfoGameId = payload => ({
  type: SET_MARKET_GAMEINFO_GAMEID,
  payload,
});

/**
 * Request Game info on market page.
 * @param {Object} payload
 * @param {number} payload.gameId
 * @param {string} payload.type summary type
 */
export const requestMarketGameInfo = () => ({
  type: REQUEST_MARKET_GAMEINFO,
});

/**
 * Clear game info on market page.
 */
export const clearMarketGameInfo = () => ({
  type: CLEAR_MARKET_GAMEINFO,
});

/**
 * Set market game info
 * @param {any} payload game info
 */
export const setMarketGameInfo = payload => ({
  type: SET_MARKET_GAMEINFO,
  payload,
});

/**
 * Set transition step
 * @param {Object} payload
 * @param {string} payload.name ui name
 * @param {number} payload.value step
 */
export const setTransitionsStep = payload => ({
  type: SET_TRANSITIONS_STEP,
  payload,
});

/**
 * Clear all transition step
 */
export const clearTransitionsStep = () => ({
  type: CLEAR_TRANSITIONS_STEP,
});

/**
 * Start transitions.
 * @param {string} payload transition name.
 */
export const runTransitions = payload => ({
  type: RUN_TRANSITION,
  payload,
});

export const pushTestData = () => ({
  type: PUSH_TEST_DATA,
});

/**
 * Request next of summary list data.
 */
export const requestNextSummaryListData = () => ({
  type: REQUEST_NEXT_SUMMARY_LIST_DATA,
});

/**
 * Reset summary list date range.
 * @param {Object} payload is date range past
 */
export const resetSummaryListDateRange = payload => ({
  type: RESET_SUMMARY_LIST_DATE_RANGE,
  payload,
});

/**
 * Update market game information.
 * @param {Object} payload game information data.
 */
export const updateMarketGameInfo = payload => ({
  type: UPDATE_MARKET_GAME_INFO,
  payload,
});

export const clearLoadDownStatus = payload => ({
  type: CLEAR_LOADDOWN_STATUS,
  payload,
});

export const openKeyBoard = payload => ({
  type: OPEN_KEYBOARD,
  payload,
});

/**
 * Set handle function when keyboard press done.
 * @param {*} payload handle function
 */
export const setKeyBoardHandleFunc = payload => ({
  type: SET_KEYBOARD_HANDLE_FUNC,
  payload,
});

export const setSummaryItemRenderCount = payload => ({
  type: SET_SUMMARY_ITEM_RENDER_COUNT,
  payload,
});

export const initalState = {
  isSafariBrowser:
    /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent),
  isKeyBoardOpen: false,
  keyBoardHandleFunc: () => {},
  marketGameInfo: {
    competition: { id: 0 },
    sport: { id: 0 },
    id: 0,
    team1_name: '',
    team2_name: '',
    team1_id: 0,
    team2_id: 0,
    type: 0,
    final_score: '',
    start_ts: 0,
    is_closed: false,
  },
  modal: '',
  summaryListType: 'upcoming',
  summaryListDateRange: {},
  mainDataViewPoint: 'game',
  summaryItemRenderCount: 0,
  loading: {
    initalApp: false,
    classifier: false,
    summaryList: false,
    balanceHistory: false,
    betHistory: false,
    battleHeader: false,
  },
  loadDown: {
    initalApp: false,
    classifier: false,
    summaryList: false,
    balanceHistory: false,
    betHistory: false,
    battleHeader: false,
  },
  transition: {
    game: 0,
    market: 0,
  },
};

/* eslint-disable default-case, no-param-reassign */
export default (state = initalState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case OPEN_MODAL:
        draft.modal = action.payload;
        break;
      case CLOSE_MODAL:
        draft.modal = '';
        break;
      case SET_SUMMARY_LIST_TYPE:
        draft.summaryListType = action.payload;
        break;
      case SET_MAIN_DATA_VIEW_POINT:
        draft.mainDataViewPoint = action.payload;
        break;
      case SET_LOADING_STATUS:
        draft.loading[action.payload.name] = action.payload.value;
        // draft.loadDown[action.payload.name] = !action.payload.value;
        if (!action.payload.value) {
          draft.loadDown[action.payload.name] = true;
        }
        break;
      case CLEAR_LOADDOWN_STATUS:
        draft.loadDown[action.payload] = false;
        break;
      case SET_MARKET_GAMEINFO: {
        extend(
          true,
          draft.marketGameInfo,
          Object.values(action.payload.game)[0],
        );
        break;
      }
      case CLEAR_MARKET_GAMEINFO: {
        draft.marketGameInfo = {
          competition: { id: 0 },
          sport: { id: 0 },
          id: 0,
          team1_name: '',
          team2_name: '',
          team1_id: 0,
          team2_id: 0,
          type: 0,
          final_score: '',
          start_ts: 0,
          is_closed: false,
        };
        draft.loadDown.battleHeader = false;
        break;
      }
      case SET_TRANSITIONS_STEP:
        draft.transition[action.payload.name] = action.payload.value;
        break;
      case CLEAR_TRANSITIONS_STEP:
        draft.transition.game = 0;
        draft.transition.market = 0;
        break;
      case SET_MARKET_GAMEINFO_GAMEID:
        draft.marketGameInfo.id = action.payload;
        break;
      case SET_SUMMARY_DATE_RANGE: {
        const { startDate, endDate } = action.payload;
        draft.summaryListDateRange.from = startDate;
        draft.summaryListDateRange.to = endDate;
        break;
      }
      case RESET_SUMMARY_LIST_DATE_RANGE: {
        const type = action.payload;
        draft.summaryListDateRange = createDateRange(
          type,
          settings.defaultDateRange,
        );
        break;
      }
      case UPDATE_MARKET_GAME_INFO: {
        ObjectFind(action.payload, 'game').forEach(([, gameValue]) => {
          extend(true, draft.marketGameInfo, gameValue);
        });
        break;
      }
      case OPEN_KEYBOARD:
        if (!action.payload) draft.keyBoardHandleFunc = () => {};
        draft.isKeyBoardOpen = action.payload;

        break;
      case SET_KEYBOARD_HANDLE_FUNC: {
        draft.keyBoardHandleFunc = action.payload;
        break;
      }
      case SET_SUMMARY_ITEM_RENDER_COUNT: {
        draft.summaryItemRenderCount = action.payload;
        break;
      }
    }
  });
