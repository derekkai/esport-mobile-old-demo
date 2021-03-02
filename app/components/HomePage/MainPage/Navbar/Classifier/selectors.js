import { createSelector } from 'reselect';

const selectClassifierEntity = state => state.classifier.entity;

const makeKeys = createSelector(
  selectClassifierEntity,
  entity => {
    const keys = [];
    const temp = Object.values(entity);
    for (let i = 0; i < temp.length; i += 1) {
      const temp2 = Object.values(temp[i].competition);
      for (let j = 0; j < temp2.length; j += 1) {
        if (temp2[j].game) {
          keys.push(temp[i].id);
          break;
        }
      }
    }
    return keys;
  },
);

export { makeKeys };
