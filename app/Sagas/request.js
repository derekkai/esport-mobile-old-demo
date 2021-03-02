import { call, takeEvery, select, put, delay } from 'redux-saga/effects';
import { data as upcomingGameData} from 'data/upcomingSummary';
import { data as upcomingMarketData } from 'data/upcomingMarket';
import { data as resultGameData } from 'data/resultSummary';
import { data as resultMarketData } from 'data/resultMarket';
import { data as marketGameInfoData} from 'data/marketGameInfo';
import { data as recommendGameData} from 'data/recommandGame';
import history from 'utils/history';
import { REQUEST_LIVE_DATA, setLiveData, updateLiveData } from 'reducers/live';
import {
  setMarketUpcomingData,
  updateMarketUpcomingData,
} from 'reducers/marketUpcoming';
import { setMarketResultData } from 'reducers/marketResult';
import {
  setGameUpcomingData,
  updateGameUpcomingData,
} from 'reducers/gameUpcoming';
import {
  setGameChampionData,
  updateGameChampionData,
} from 'reducers/gameChampion';
import { setGameResultData } from 'reducers/gameResult';
import {
  setRecommandGameData,
  REQUEST_RECOMMAND_GAME_DATA,
} from 'reducers/recommandGame';
import { getNewsData } from 'helpers/api';
import {
  REQUEST_MARKET_GAMEINFO,
  setMarketGameInfo,
  setLoadingStatus,
  RQEUEST_SUMMARY_LIST_DATA,
  REQUEST_MARKET_LIST_DATA,
  SET_SUMMARY_DATE_RANGE,
  updateMarketGameInfo,
  clearLoadDownStatus,
} from 'reducers/global';
import { REQUEST_NEWS_DATA, setNewsData } from 'reducers/news';
import { isEmpty, toSecondTimesStamp } from 'helpers/common';
import {
  getGameData,
  getMarketData,
  getGameResultData,
  getMarketResultData,
  getMarketGameInfo,
  getResultMarketGameInfo,
  getLiveData,
  getChampionData,
  getRecommandGame,
} from '../helpers/commandSender';
import { addReceiver, unsubscribeHandler } from './websocket';
import {
  selectSummaryListType,
  selectCasualSelect,
  selectSelectionSet,
  selectClassifierEntity,
  selectSummaryListDateRange,
  selectGameResultKeys,
  selectMarketGameId,
} from './selectors';

export function* requestSummaryListData(keepOriginData) {
  // yield put(clearLoadDownStatus('summaryList'));
  yield delay(1000);

  yield call(unsubscribeHandler, 'gameUpcoming');
  yield delay(1000);
  // yield put(setLoadingStatus({ name: 'summaryList', value: true }));
  const rid = `${Date.now()}@summary`;
  const type = yield select(selectSummaryListType);
  let viewCompetitionId = [];
  const sportId = [];

  const casualSelect = yield select(selectCasualSelect);
  const selectionSet = yield select(selectSelectionSet);
  const entity = yield select(selectClassifierEntity);

  // CasualSelect
  if (
    casualSelect !== 'all' &&
    !selectionSet[casualSelect] &&
    entity[casualSelect]
  ) {
    Object.values(entity[casualSelect].competition).forEach(el => {
      viewCompetitionId.push(el.id);
    });
    sportId.push(casualSelect);
  }

  // selectionSet
  if (!isEmpty(selectionSet)) {
    Object.entries(selectionSet).forEach(([key, value]) => {
      sportId.push(Number(key));
      viewCompetitionId = [...viewCompetitionId, ...value];
    });
  }

  // date range
  const dateRange = yield select(selectSummaryListDateRange);
  const begin = toSecondTimesStamp(dateRange.from);
  const end = toSecondTimesStamp(dateRange.to);

  switch (type) {
    case 'upcoming': {
      yield put(setGameUpcomingData(upcomingGameData.data));
      yield put(setLoadingStatus({ name: 'summaryList', value: false }));
      // addReceiver(
      //   rid,
      //   setGameUpcomingData,
      //   { subscribeName: 'gameUpcoming' },
      //   updateGameUpcomingData,
      //   [setLoadingStatus({ name: 'summaryList', value: false })],
      // );
      // yield call(getGameData, {
      //   rid,
      //   casualSelect,
      //   viewCompetitionId,
      //   begin,
      //   end,
      // });
      break;
    }
    case 'result': {
      yield put(setGameResultData(resultGameData.data));
      yield put(setLoadingStatus({ name: 'summaryList', value: false }));
      // const keys = yield select(selectGameResultKeys);
      // addReceiver(rid, setGameResultData, null, null, [
      //   setLoadingStatus({ name: 'summaryList', value: false }),
      // ]);
      // yield call(getGameResultData, {
      //   rid,
      //   casualSelect,
      //   viewCompetitionId,
      //   sportId,
      //   skip: keys.length,
      //   begin,
      //   end,
      // });
      break;
    }
    // case 'champion': {
    //   addReceiver(
    //     rid,
    //     setGameChampionData,
    //     { subscribeName: 'gameChampion' },
    //     updateGameChampionData,
    //     [setLoadingStatus({ name: 'summaryList', value: false })],
    //   );
    //   yield call(getChampionData, {
    //     rid,
    //     casualSelect,
    //     viewCompetitionId,
    //     begin,
    //     end,
    //   });
    //   break;
    // }
    default:
      break;
  }
  yield put(setLoadingStatus({ name: 'summaryList', value: false }));
}

function* requestMarketListData() {
  const rid = `${Date.now()}@Market`;
  const type = yield select(selectSummaryListType);
  const gameId = yield select(selectMarketGameId);
  switch (type) {
    case 'upcoming': {
      yield put(setMarketUpcomingData(upcomingMarketData.data));
      // addReceiver(
      //   rid,
      //   setMarketUpcomingData,
      //   { subscribeName: 'marketUpcoming' },
      //   updateMarketUpcomingData,
      // );
      // yield call(getMarketData, rid, gameId);
      break;
    }
    case 'result': {
      yield put(setMarketResultData(resultMarketData.data));
      // addReceiver(rid, setMarketResultData);
      // yield call(getMarketResultData, rid, gameId);
      break;
    }
    default:
      break;
  }
}

function* requestMarketGameInfo() {
  yield put(setMarketGameInfo(marketGameInfoData.data));
  yield put(setLoadingStatus({ name: 'battleHeader', value: false }));
  // const paths = history.location.pathname.split('/');
  // const gameId = Number(paths[3]);
  // const type = yield select(selectSummaryListType);
  // yield put(setLoadingStatus({ name: 'battleHeader', value: true }));
  // const rid = `${Date.now()}@singleGameInfo`;
  // addReceiver(
  //   rid,
  //   setMarketGameInfo,
  //   { subscribeName: 'marketGameInfo' },
  //   updateMarketGameInfo,
  //   [setLoadingStatus({ name: 'battleHeader', value: false })],
  // );
  // switch (type) {
  //   case 'upcoming':
  //     yield call(getMarketGameInfo, rid, gameId);
  //     break;
  //   case 'result':
  //     yield call(getResultMarketGameInfo, rid, gameId);
  //     break;
  //   default:
  //     break;
  // }
}

function* requestNewsDataData() {
  try {
    const result = yield call(getNewsData);
    const { IsSuccess, Data } = result;
    if (IsSuccess) {
      yield put(setNewsData(Data));
    }
  } catch (e) {
    console.error(e);
  }
}

function* requestLiveData() {
  // try {
  //   const rid = `${Date.now()}@live`;
  //   addReceiver(rid, setLiveData, { subscribeName: 'live' }, updateLiveData);
  //   yield call(getLiveData, rid);
  // } catch (e) {
  //   console.error(e);
  // }
}

function* requestRecommandGameData() {
  yield put(setRecommandGameData(recommendGameData.data));
  // try {
  //   const rid = `${Date.now()}@recommand`;
  //   addReceiver(rid, setRecommandGameData, { subscribeName: 'recommand' });
  //   yield call(getRecommandGame, rid);
  // } catch (e) {
  //   console.error(e);
  // }
}

export default function* watchers() {
  yield takeEvery(REQUEST_RECOMMAND_GAME_DATA, requestRecommandGameData);
  yield takeEvery(REQUEST_NEWS_DATA, requestNewsDataData);
  yield takeEvery(REQUEST_MARKET_GAMEINFO, requestMarketGameInfo);
  yield takeEvery(RQEUEST_SUMMARY_LIST_DATA, requestSummaryListData, true);
  yield takeEvery(REQUEST_MARKET_LIST_DATA, requestMarketListData);
  yield takeEvery(SET_SUMMARY_DATE_RANGE, requestSummaryListData, false);
  yield takeEvery(REQUEST_LIVE_DATA, requestLiveData);
}
