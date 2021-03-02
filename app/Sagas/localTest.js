import { put, takeEvery } from 'redux-saga/effects';
import { updateLiveData } from 'reducers/live';
import { updateClassifierData } from 'reducers/classifier';
import classifierData from './classifierData.json';
import liveInsertTestData from './liveInsert.json';
import { PUSH_LIVE_DATA, PUSH_CLASSIFIER } from '../reducers/localTest';

const subscribes = {
  0: {
    action: updateLiveData,
    id: 'testLive',
  },
  3: {
    action: updateClassifierData,
    id: 'testClassifier',
  },
};

function* pushLiveData(action) {
  const type = action.payload;
  console.log(type);
  const [subid, others] = Object.entries(liveInsertTestData[type].data)[0];
  yield put(subscribes[subid].action(others));
}

function* pushClassifierData() {
  const [subid, others] = Object.entries(classifierData.data)[0];
  console.log(subid);
  console.log(others);
  yield put(subscribes[subid].action(others));
}

export default function* watchers() {
  yield takeEvery(PUSH_LIVE_DATA, pushLiveData);
  yield takeEvery(PUSH_CLASSIFIER, pushClassifierData);
}
