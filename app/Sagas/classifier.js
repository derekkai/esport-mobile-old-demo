import { call, takeEvery, select, put } from 'redux-saga/effects';
import { data } from 'data/classifier';
import history from 'utils/history';
import settings from 'settings';
import { toSecondTimesStamp } from 'helpers/common';
import {
  SET_CLASSIFIER_CASUAL_SELECT,
  SET_CLASSIFIER_SELECTION_SET,
  SELECT_ALL_COMPETITION,
  CLEAR_ALL_COMPETITION,
  setClassifierData,
  REQUEST_CLASSIFIER_DATA,
  updateClassifierData,
} from 'reducers/classifier';
import { setLoadingStatus, SET_SUMMARY_DATE_RANGE } from 'reducers/global';
import { getClassifierData } from '../helpers/commandSender';
import { addReceiver, unsubscribeHandler } from './websocket';
import {
  selectSummaryListType,
  selectSummaryListDateRange,
  selectPathname,
} from './selectors';
import { requestSummaryListData } from './request';

export function* requestClassifierData() {
  // yield call(unsubscribeHandler, 'classifier');
  yield put(setClassifierData(data.data));
  yield put(setLoadingStatus({ name: 'classifier', value: false }));
  // const rid = `${Date.now()}@classifier`;
  // const summaryListType = yield select(selectSummaryListType);
  // const dateRange = yield select(selectSummaryListDateRange);
  // const begin = toSecondTimesStamp(dateRange.from);
  // const end = toSecondTimesStamp(dateRange.to);
  // if (summaryListType === 'result') {
  //   addReceiver(rid, setClassifierData, null, null, [
  //     setLoadingStatus({ name: 'classifier', value: false }),
  //   ]);
  // } else {
  //   addReceiver(
  //     rid,
  //     setClassifierData,
  //     { subscribeName: 'classifier' },
  //     updateClassifierData,
  //     [setLoadingStatus({ name: 'classifier', value: false })],
  //   );
  // }
  // yield call(getClassifierData, { rid, summaryListType, begin, end });
}

function* classifierSelectChange(keep) {
  const url = yield select(selectPathname);
  const type = yield select(selectSummaryListType);
  // If not on main page then push to.
  if (!settings.summaryListData.paths.includes(url.replace('/', ''))) {
    history.push(`/${settings.summaryListData.tabs[type].path}`);
  } else {
    yield call(requestSummaryListData, keep);
  }
}

export default function* watchers() {
  yield takeEvery(SET_CLASSIFIER_CASUAL_SELECT, classifierSelectChange, false);
  yield takeEvery(SET_CLASSIFIER_SELECTION_SET, classifierSelectChange, false);
  yield takeEvery(SELECT_ALL_COMPETITION, classifierSelectChange, false);
  yield takeEvery(CLEAR_ALL_COMPETITION, classifierSelectChange, false);
  yield takeEvery(REQUEST_CLASSIFIER_DATA, requestClassifierData);
  yield takeEvery(SET_SUMMARY_DATE_RANGE, requestClassifierData);
}
