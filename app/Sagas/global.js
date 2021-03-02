import {
  takeEvery,
  put,
  delay,
  call,
  take,
  select,
  fork,
} from 'redux-saga/effects';
import history from 'utils/history';
import { getParameterByName, colorLog } from 'helpers/common';
import { requestLiveData } from 'reducers/live';
import {
  setTransitionsStep,
  clearTransitionsStep,
  RUN_TRANSITION,
  INITAL_APP,
  setLoadingStatus,
  SET_SUMMARY_LIST_TYPE,
  resetSummaryListDateRange,
} from 'reducers/global';
import Cookie from 'js-cookie';
import { SET_ACCOUNT_DATA } from 'reducers/account';
import { requestUserInfo, requestUserLogin } from './account';
import { selectSummaryListType } from './selectors';
import { startNewsPollingTask, startBalancePollingTask } from './worker';

// inital app handler.
function* initalApp() {
  colorLog('Inital App...', 'info');
  yield put(setLoadingStatus({ name: 'initalApp', value: true }));
  // yield put({ type: 'INITIALIZE_WEB_SOCKETS_CHANNEL' });
  // yield take('SERVER_CONNECTED');
  // yield call(tryToLogin);
  // colorLog('Try to login.', 'sub_info');
  // yield take(SET_ACCOUNT_DATA);
  // yield fork(startNewsPollingTask);
  // yield fork(startBalancePollingTask);
  yield put(requestLiveData());
  yield put(setLoadingStatus({ name: 'initalApp', value: false }));
  colorLog('Inital finish!', 'info');
}

function* runTransitions(action) {
  yield put(clearTransitionsStep());
  const name = action.payload;
  yield delay(500);
  yield put(setTransitionsStep({ name, value: 1 }));
  yield delay(300);
  yield put(setTransitionsStep({ name, value: 2 }));
  yield delay(300);
  yield put(setTransitionsStep({ name, value: 3 }));
}

function* tryToLogin() {
  let AuthToken = getParameterByName('AuthToken');
  if (AuthToken) {
    Cookie.set('AuthToken', AuthToken);
    history.push('');
  } else {
    AuthToken = Cookie.get('AuthToken');
  }
  if (AuthToken) {
    yield call(requestUserInfo, AuthToken);
  }
  yield call(requestUserLogin, AuthToken);
}

function* summaryListTypeChangeTask() {
  const summaryListType = yield select(selectSummaryListType);
  if (summaryListType === 'result') {
    yield put(resetSummaryListDateRange(true));
  } else {
    yield put(resetSummaryListDateRange(false));
  }
}

export default function* watchers() {
  yield takeEvery(SET_SUMMARY_LIST_TYPE, summaryListTypeChangeTask);
  yield takeEvery(INITAL_APP, initalApp);
  yield takeEvery(RUN_TRANSITION, runTransitions);
}
