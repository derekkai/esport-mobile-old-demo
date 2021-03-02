const prefix = 'localTest';
export const PUSH_LIVE_DATA = `${prefix}/PUSH_LIVE_DATA`;
export const PUSH_CLASSIFIER = `${prefix}/PUSH_CLASSIFIER`;

export const pushLiveData = payload => ({
  type: PUSH_LIVE_DATA,
  payload,
});

export const pushClassifier = () => ({
  type: PUSH_CLASSIFIER,
});
