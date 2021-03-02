/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import history from 'utils/history';
import languageProviderReducer from './language';
import betslip from './betslip';
import balanceHistory from './balanceHistory';
import global from './global';
import betHistory from './betHistory';
import news from './news';
import classifier from './classifier';
import gameUpcoming from './gameUpcoming';
import marketUpcoming from './marketUpcoming';
import gameResult from './gameResult';
import marketResult from './marketResult';
import account from './account';
import recommandGame from './recommandGame';
import live from './live';
import gameChampion from './gameChampion';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    ...injectedReducers,
    language: languageProviderReducer,
    router: connectRouter(history),
    betslip,
    balanceHistory,
    global,
    betHistory,
    news,
    classifier,
    gameUpcoming,
    marketUpcoming,
    gameResult,
    marketResult,
    account,
    recommandGame,
    live,
    gameChampion,
  });

  return rootReducer;
}
