import produce from 'immer';
import settings from 'settings';

const prefix = 'betslip';
export const ADD_BET = `${prefix}/ADD_BET`;
export const REQUEST_DO_BET = `${prefix}/REQUEST_DO_BET`;
export const UPDATE_BET = `${prefix}/UPDATE_BET`;
const SET_BET_TYPE = `${prefix}/SET_BET_TYPE`;
const SET_ODDS_FORMAT = `${prefix}/SET_ODDS_FORMAT`;
export const REMOVE_BETS = `${prefix}/REMOVE_BETS`;
const UPDATE_SINGLE_STAKE = `${prefix}/UPDATE_SINGLE_STAKE`;
const SET_POTENTIAL_WIN = `${prefix}/SET_POTENTIAL_WIN`;
const UPDATE_STAKE = `${prefix}/UPDATE_STAKE`;
export const CLRAR_BETSLIP_DATA = `${prefix}/CLRAR_BETSLIP_DATA`;
const SET_SYSTEM_NUM = `${prefix}/SET_SYSTEM_NUM`;
const UPDATE_DO_BET_RESULT = `${prefix}/UPDATE_DO_BET_RESULT`;
export const RESET_BETSLIP = `${prefix}/RESET_BETSLIP`;
const SET_PRICE_CHANGE_HANDLE_TYPE = `${prefix}/SET_PRICE_CHANGE_HANDLE_TYPE`;
export const SET_BET_PRICE = `${prefix}/SET_BET_PRICE`;
export const REQUEST_UPDATE_BET_EVENT_DATA = `${prefix}/REQUEST_UPDATE_BET_EVENT_DATA`;
export const REMOVE_BETS_ENTITY = `${prefix}/REMOVE_BETS_ENTITY`;
const REMOVE_BETS_KEY = `${prefix}/REMOVE_BETS_KEY`;
const SET_SYSTEM_BET_COUNT = `${prefix}/SET_SYSTEM_BET_COUNT`;

/**
 * Add a bet.
 * @param {Object} payload
 * @param {string} payload.pick
 * @param {number} payload.eventId
 * @param {string} payload.oddName
 * @param {number} payload.time
 * @param {string} payload.marketType
 * @param {number} payload.price
 */
export const addBet = payload => ({
  type: ADD_BET,
  payload,
});

/**
 * Update bet.
 * @param {Object} payload new bet data
 */
export const updateBet = payload => ({
  type: UPDATE_BET,
  payload,
});

/**
 * Update single stake.
 * @param {Object} payload
 * @param {number} payload.eventId
 * @param {string} payload.stake
 */
export const updateSingleStake = payload => ({
  type: UPDATE_SINGLE_STAKE,
  payload,
});

/**
 * Remove bet.
 * @param {number} payload event id
 */
export const removeBet = payload => ({
  type: REMOVE_BETS,
  payload,
});

/**
 * Request do bet.
 */
export const requestDoBet = () => ({
  type: REQUEST_DO_BET,
});

/**
 * Set bet may earn.
 * @param {Object} payload
 * @param {number} payload.eventId
 * @param {string} payload.value
 */
export const setPotentialWin = payload => ({
  type: SET_POTENTIAL_WIN,
  payload,
});

/**
 * Update bet stake when bet type is multiple or system.
 * @param {string} payload stake
 */
export const updateStake = payload => ({
  type: UPDATE_STAKE,
  payload,
});

/**
 * Change bet type.
 * @param {string} payload type
 */
export const setBetType = payload => ({
  type: SET_BET_TYPE,
  payload,
});

/**
 * Change bet format.
 * @param {string} payload format
 */
export const setOddsFormat = payload => ({
  type: SET_ODDS_FORMAT,
  payload,
});

/**
 * Cleat bet slip data.
 */
export const clearBetslipData = () => ({
  type: CLRAR_BETSLIP_DATA,
});

/**
 * Set system number.
 * @param {string} payload number
 */
export const setSystemNum = payload => ({
  type: SET_SYSTEM_NUM,
  payload,
});

/**
 * Update betsilp after do bet success.
 * @param {Object} payload do bet result
 */
export const updateDoBetResult = payload => ({
  type: UPDATE_DO_BET_RESULT,
  payload,
});

/**
 * Reset entire betslip.
 */
export const resetBetslip = () => ({
  type: RESET_BETSLIP,
});

/**
 * Set handle way when price change.
 */
export const setPriceChangeHandleType = payload => ({
  type: SET_PRICE_CHANGE_HANDLE_TYPE,
  payload,
});

/**
 * Update price of bet.
 * @param {Object} payload price update data.
 */
export const setBetPrice = payload => ({
  type: SET_BET_PRICE,
  payload,
});

/**
 * Request update data of bet event.
 */
export const requestUpdateBetEventData = () => ({
  type: REQUEST_UPDATE_BET_EVENT_DATA,
});

export const setSystemBetCount = payload => ({
  type: SET_SYSTEM_BET_COUNT,
  payload,
});

/**
 * Remove event in entity.
 * @param {number} payload bet event id.
 */
export const removeBetEntity = payload => ({
  type: REMOVE_BETS_ENTITY,
  payload,
});

/**
 * Remove event in keys.
 * @param {number} payload bet event id.
 */
export const removeBetsKey = payload => ({
  type: REMOVE_BETS_KEY,
  payload,
});

export const initalState = {
  priceNeverChange: true,
  priceChangeHandleType: settings.defaultPriceChangeHandleType,
  gameLimit: {},
  betType: settings.defaultBetType,
  oddsFormat: settings.defaultOddsFormat,
  keys: [],
  entity: {},
  stake: 0,
  systemNum: 2,
  showResult: false,
  isSuccess: false,
  isWaitingResponse: false,
  systemBetCount: 0,
  failCode: 0,
};

let singleUnhandleCount = 0;
let removeBetTemp = [];

/* eslint-disable default-case, no-param-reassign */
export default (state = initalState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_SYSTEM_BET_COUNT:
        draft.systemBetCount = action.payload;
        break;
      case SET_BET_TYPE:
        draft.betType = action.payload;
        break;
      case SET_ODDS_FORMAT:
        draft.oddsFormat = action.payload;
        break;
      case CLRAR_BETSLIP_DATA:
        draft.priceNeverChange = true;
        draft.gameLimit = {};
        draft.stake = '';
        draft.systemNum = 2;
        draft.systemBetCount = 0;
        break;
      case REMOVE_BETS: {
        const { eventId, gameId } = action.payload;
        draft.keys.splice(draft.keys.indexOf(eventId), 1);
        delete draft.entity[eventId];
        delete draft.gameLimit[gameId];
        // auto change to multiple
        if (draft.keys.length === 0) {
          draft.priceNeverChange = true;
          draft.stake = '';
        } else if (draft.keys.length <= 1) {
          draft.betType = 'single';
        } else if (draft.keys.length <= 2) {
          draft.betType = 'multiple';
          draft.systemBetCount = 0;
        }
        break;
      }
      case REMOVE_BETS_ENTITY: {
        delete draft.entity[action.payload];
        break;
      }
      case REMOVE_BETS_KEY: {
        draft.keys.splice(draft.keys.indexOf(action.payload.eventId), 1);
        delete draft.gameLimit[action.payload.gameId];
        break;
      }
      case ADD_BET: {
        if (draft.keys.length > settings.betslipBetCountMAX - 1) break;
        const {
          gameId,
          eventId,
          oddName,
          time,
          marketType,
          pick,
          price,
          marketId,
        } = action.payload;
        if (draft.gameLimit[gameId]) {
          const removeEventId = draft.gameLimit[gameId];
          draft.keys.splice(draft.keys.indexOf(removeEventId), 1);
        }
        draft.keys.unshift(eventId);
        draft.entity[eventId] = {
          oddName,
          time,
          marketType,
          pick,
          stake: 0,
          status: 'normal',
          reason: '',
          price,
          gameId,
          marketId,
        };
        draft.gameLimit[gameId] = eventId;
        // auto change to multiple
        if (draft.keys.length > 1 && draft.betType === 'single') {
          draft.betType = 'multiple';
        }
        break;
      }
      case SET_BET_PRICE: {
        const tempkeys = [...state.keys];
        const gamelist = [];
        Object.entries(action.payload.game).forEach(([gameId, game]) => {
          tempkeys.splice(tempkeys.indexOf(state.gameLimit[game.id]), 1);
          gamelist.push([gameId, game]);
        });
        parseUpdateData(draft, gamelist);
        tempkeys.forEach(eventId => {
          draft.entity[eventId].status = 'close';
        });
        break;
      }
      case UPDATE_BET: {
        let gamelist = [];
        Object.values(action.payload.sport).forEach(sport => {
          Object.values(sport.region).forEach(region => {
            Object.values(region.competition).forEach(competition => {
              gamelist = [...gamelist, ...Object.entries(competition.game)];
            });
          });
        });
        parseUpdateData(draft, gamelist);
        draft.priceNeverChange = false;
        break;
      }
      case UPDATE_SINGLE_STAKE: {
        const { eventId, stake } = action.payload;
        draft.entity[eventId].stake = Number(stake);
        break;
      }
      case SET_POTENTIAL_WIN: {
        const { eventId, value } = action.payload;
        draft.entity[eventId].potentialWin = Number(value);
        break;
      }
      case UPDATE_STAKE:
        draft.stake = action.payload;
        break;
      case SET_SYSTEM_NUM:
        draft.systemNum = action.payload;
        break;
      case UPDATE_DO_BET_RESULT: {
        draft.isWaitingResponse = false;
        const { code, localParams } = action.payload;
        if (localParams && localParams.totalCount) {
          const { event_id, totalCount } = localParams;
          // single
          if (singleUnhandleCount === 0) {
            singleUnhandleCount = totalCount;
          }
          if (code === 0) {
            removeBetTemp.push(event_id);
          } else if (
            draft.failCode === 0 ||
            draft.failCode !== settings.serverCode.InsufficientBalance
          ) {
            draft.failCode = code;
          }
          singleUnhandleCount -= 1;
          if (singleUnhandleCount === 0) {
            if (removeBetTemp.length === 0) {
              draft.isSuccess = false;
            } else {
              draft.isSuccess = true;
            }
            draft.showResult = true;
          }
        } else {
          // multiple and system
          if (code === 0) {
            draft.isSuccess = true;
          } else {
            draft.isSuccess = false;
          }
          draft.failCode = code;
          draft.showResult = true;
        }
        break;
      }
      case RESET_BETSLIP: {
        draft.showResult = false;
        if (removeBetTemp.length === 0) {
          if (state.isSuccess) {
            draft.gameLimit = {};
            draft.keys = [];
          }
        } else {
          state.keys.forEach(el => {
            if (removeBetTemp.includes(el)) {
              draft.keys.splice(draft.keys.indexOf(el), 1);
              Object.entries(state.gameLimit).forEach(([gameId, eventId]) => {
                if (eventId === el) {
                  delete draft.gameLimit[gameId];
                }
              });
            }
          });
        }
        draft.failCode = 0;
        draft.betType = settings.defaultBetType;
        removeBetTemp = [];
        draft.stake = '';
        draft.systemNum = 2;
        draft.priceNeverChange = true;
        draft.systemBetCount = 0;
        break;
      }
      case SET_PRICE_CHANGE_HANDLE_TYPE:
        draft.priceChangeHandleType = action.payload;
        break;
      case REQUEST_DO_BET:
        draft.isWaitingResponse = true;
        break;
    }
  });

const closeBet = (draft, eventId) => {
  if (draft.entity[eventId]) {
    draft.entity[eventId].status = 'close';
  }
  //draft.gameLimit[gameId] = undefined;
};

const parseUpdateData = (draft, gamelist) => {
  gamelist.forEach(game => {
    const [gameId, gameValue] = game;
    const oldEventId = draft.gameLimit[gameId];
    if (!gameValue) {
      closeBet(draft, oldEventId);
    } else if (gameValue.market) {
      Object.values(gameValue.market).forEach(market => {
        if (!market) {
          closeBet(draft, oldEventId);
        } else if (market.event) {
          Object.entries(market.event).forEach(([eventId, event]) => {
            if (!event) {
              closeBet(draft, oldEventId);
            } else {
              draft.gameLimit[gameId] = Number(eventId);
              draft.entity[eventId].status = 'normal';
              draft.entity[eventId].price = event.price;
            }
          });
        }
      });
    }
  });
};
