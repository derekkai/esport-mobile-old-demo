import { createSelector } from 'reselect';

const selectSport = state => state.classifier.entity || [];

const makeAllCount = createSelector(
  selectSport,
  state => {
    let AllCount = 0;
    Object.values(state).forEach(sport => {
      if (sport.competition) {
        Object.values(sport.competition).forEach(competition => {
          if (competition && competition.game) {
            AllCount += Object.keys(competition.game).length;
          }
        });
      }
    });
    return AllCount;
  },
);

export { makeAllCount };
