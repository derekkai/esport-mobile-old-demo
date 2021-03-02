import { put, delay, select } from 'redux-saga/effects';
import { requestNewsData } from 'reducers/news';
import { requestBalance } from 'reducers/account';
import settings from 'settings';
import { selectIsLogin } from './selectors';

export function* startNewsPollingTask() {
  while (true) {
    try {
      yield put(requestNewsData());
      yield delay(settings.newsPollingTime);
    } catch (e) {
      console.error(e);
    }
  }
}

export function* startBalancePollingTask() {
  while (true) {
    try {
      const isLogin = yield select(selectIsLogin);
      if (isLogin) {
        yield put(requestBalance());
        yield delay(settings.balancePollingTime);
      }
    } catch (e) {
      console.error(e);
    }
  }
}
