import { call, takeEvery, put, select, delay } from 'redux-saga/effects';
import { data as balanceHistoryData } from 'data/balanceHistory';
import { data as betHistoryData } from 'data/betHistory';
import {
  REQUEST_USER_LOGIN,
  setAccountData,
  REQUEST_BALANCE,
  setBalance,
  setUserInfo,
  REQUEST_USER_INFO,
} from 'reducers/account';
import { RESET_BETSLIP } from 'reducers/betslip';
import { changeLocale } from 'reducers/language';
import {
  REQUEST_BALANCE_HISTORY,
  setBalanceHistory,
  SET_BALANCE_HISTORY_RANGE,
  clearBalanceHistory,
} from 'reducers/balanceHistory';
import { setLoadingStatus } from 'reducers/global';
import {
  REQUEST_BET_HISTORY,
  setBetHistory,
  SET_BET_HISTORY_RANGE,
  clearBetHistory,
} from 'reducers/betHistory';
import {
  getBalance,
  getUserInfo,
  getBalanceHistory,
  getBetHistory,
} from 'helpers/api';
import { login } from 'helpers/commandSender';
import { toSecondTimesStamp } from 'helpers/common';
import { langMap } from 'settings';
import { addReceiver } from './websocket';
import {
  selectAuthToken,
  selectBalanceHistoryDateRange,
  selectBetHistoryDateRange,
  selectAccountLang,
} from './selectors';

function* requestBalance() {
  try {
    yield delay(1000);
    const Authtoken = yield select(selectAuthToken);
    const result = yield call(getBalance, Authtoken);
    const { IsSuccess, Data } = result;
    if (IsSuccess) {
      yield put(setBalance(Data));
    }
  } catch (e) {
    console.error(e);
  }
}

export function* requestUserLogin(AuthToken) {
  try {
    const lang = yield select(selectAccountLang);
    const rid = `@login`;
    addReceiver(rid, setAccountData, { AuthToken });
    yield call(login, rid, AuthToken, lang);
  } catch (e) {
    console.error(e);
  }
}

export function* requestUserInfo(AuthToken) {
  try {
    const result = yield call(getUserInfo, AuthToken);
    const { IsSuccess, Data } = result;
    if (IsSuccess) {
      yield put(changeLocale(langMap[Data.Lang]));
      yield put(setUserInfo(Data));
    }
  } catch (e) {
    console.error(e);
  }
}

function* requestBalanceHistory() {
  yield put(setBalanceHistory(balanceHistoryData.Data));
  // try {
  //   yield put(setLoadingStatus({ name: 'balanceHistory', value: true }));
  //   const Authtoken = yield select(selectAuthToken);
  //   const dateRange = yield select(selectBalanceHistoryDateRange);
  //   const StartDateTs = toSecondTimesStamp(dateRange.from);
  //   const EndDateTs = toSecondTimesStamp(dateRange.to);
  //   const result = yield call(
  //     getBalanceHistory,
  //     Authtoken,
  //     StartDateTs,
  //     EndDateTs,
  //   );
  //   yield put(setLoadingStatus({ name: 'balanceHistory', value: false }));
  //   const { IsSuccess, Data } = result;
  //   if (IsSuccess) {
  //     yield put(setBalanceHistory(Data));
  //   } else {
  //     yield put(clearBalanceHistory());
  //   }
  // } catch (e) {
  //   console.error(e);
  // }
}

function* requestBetHistory() {
  yield put(setBetHistory(betHistoryData.Data));
  // try {
  //   yield put(setLoadingStatus({ name: 'betHistory', value: true }));
  //   const lang = yield select(selectAccountLang);
  //   const Authtoken = yield select(selectAuthToken);
  //   const dateRange = yield select(selectBetHistoryDateRange);
  //   const StartDateTs = toSecondTimesStamp(dateRange.from);
  //   const EndDateTs = toSecondTimesStamp(dateRange.to);
  //   const result = yield call(
  //     getBetHistory,
  //     Authtoken,
  //     StartDateTs,
  //     EndDateTs,
  //     lang,
  //   );
  //   yield put(setLoadingStatus({ name: 'betHistory', value: false }));
  //   const { IsSuccess, Data } = result;
  //   if (IsSuccess) {
  //     yield put(setBetHistory(Data));
  //   } else {
  //     yield put(clearBetHistory());
  //   }
  // } catch (e) {
  //   console.error(e);
  // }
}

export default function* watchers() {
  yield takeEvery(REQUEST_BALANCE_HISTORY, requestBalanceHistory);
  yield takeEvery(SET_BALANCE_HISTORY_RANGE, requestBalanceHistory);
  yield takeEvery(REQUEST_USER_LOGIN, requestUserLogin);
  yield takeEvery(REQUEST_BALANCE, requestBalance);
  yield takeEvery(RESET_BETSLIP, requestBalance);
  yield takeEvery(REQUEST_BET_HISTORY, requestBetHistory);
  yield takeEvery(SET_BET_HISTORY_RANGE, requestBetHistory);
  yield takeEvery(REQUEST_USER_INFO, requestUserInfo);
}
