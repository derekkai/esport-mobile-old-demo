import produce from 'immer';

const prefix = 'classifier';
const SET_CLASSIFIER_DATA = `${prefix}/SET_CLASSIFIER_DATA`;
const RESET_CLASSIFIER_SELECTION = `${prefix}/RESET_CLASSIFIER_SELECTION`;
const UPDATE_CLASSIFIER_DATA = `${prefix}/UPDATE_CLASSIFIER_DATA`;
export const SET_CLASSIFIER_SELECTION_SET = `${prefix}/SET_CLASSIFIER_SELECTION_SET`;
export const SET_CLASSIFIER_CASUAL_SELECT = `${prefix}/SET_CLASSIFIER_CASUAL_SELECT`;
export const SELECT_ALL_COMPETITION = `${prefix}/SELECT_ALL_COMPETITION`;
export const CLEAR_ALL_COMPETITION = `${prefix}/CLEAR_ALL_COMPETITION`;
export const REQUEST_CLASSIFIER_DATA = `${prefix}/REQUEST_CLASSIFIER_DATA`;

/**
 * Request classifier data.
 */
export const requestClassifierData = () => ({
  type: REQUEST_CLASSIFIER_DATA,
});

/**
 * Set classifier data.
 * @param {Object} payload classifier data
 */
export const setClassifierData = payload => ({
  type: SET_CLASSIFIER_DATA,
  payload,
});

/**
 * Set classifier selection.
 * @param {Object} payload
 * @param {number} payload.sportId select sport id
 * @param {number} payload.competition select competition id
 */
export const setClassifierSelectionSet = payload => ({
  type: SET_CLASSIFIER_SELECTION_SET,
  payload,
});

/**
 * Set classifier casual view sport.
 * @param {number} payload sport id
 */
export const setClassifierCasualSelect = payload => ({
  type: SET_CLASSIFIER_CASUAL_SELECT,
  payload,
});

/**
 * Select all competition in single sport.
 * @param {number} payload sport id
 */
export const selectAllCompetition = payload => ({
  type: SELECT_ALL_COMPETITION,
  payload,
});

/**
 * Clear all competition in single sport.
 * @param {number} payload sport id
 */
export const clearAllCompetition = payload => ({
  type: CLEAR_ALL_COMPETITION,
  payload,
});

/**
 * Reset classifier selection.
 */
export const resetClassifierSelection = () => ({
  type: RESET_CLASSIFIER_SELECTION,
});

/**
 * Update classifier data.
 * @param {Object} payload update data
 */
export const updateClassifierData = payload => ({
  type: UPDATE_CLASSIFIER_DATA,
  payload,
});

const initalState = {
  entity: {},
  selectionSet: {},
  casualSelect: 'all',
};

/* eslint-disable default-case, no-param-reassign */
export default (state = initalState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_CLASSIFIER_DATA: {
        draft.entity = action.payload.sport;
        if (draft.casualSelect !== 'all') {
          // add all competition of casual sport into selectionSet.
          draft.selectionSet[draft.casualSelect] = [];
          Object.values(draft.entity[draft.casualSelect].competition).forEach(
            el => {
              draft.selectionSet[draft.casualSelect].push(el.id);
            },
          );
        }
        break;
      }
      case SET_CLASSIFIER_SELECTION_SET: {
        const { sportId, competition } = action.payload;
        if (state.selectionSet[sportId]) {
          if (state.selectionSet[sportId].includes(competition)) {
            draft.selectionSet[sportId] = state.selectionSet[sportId].filter(
              el => el !== competition,
            );
          } else {
            draft.selectionSet[sportId].push(competition);
          }
        } else {
          draft.selectionSet[sportId] = [competition];
        }
        break;
      }
      case SET_CLASSIFIER_CASUAL_SELECT: {
        Object.entries(state.selectionSet).forEach(([key, value]) => {
          if (value.length === 0) {
            delete draft.selectionSet[key];
          }
        });
        if (action.payload === 'all') {
          draft.selectionSet = {};
        }
        draft.casualSelect = action.payload;
        if (
          !draft.selectionSet[draft.casualSelect] &&
          action.payload !== 'all'
        ) {
          draft.selectionSet = {
            [draft.casualSelect]: [],
          };
          Object.values(draft.entity[draft.casualSelect].competition).forEach(
            el => {
              draft.selectionSet[draft.casualSelect].push(el.id);
            },
          );
        }
        break;
      }
      case SELECT_ALL_COMPETITION: {
        const sportId = action.payload;
        const newSelect = [];
        Object.values(state.entity[sportId].competition).forEach(el => {
          newSelect.push(el.id);
        });
        draft.selectionSet[sportId] = newSelect;
        break;
      }
      case CLEAR_ALL_COMPETITION: {
        const sportId = action.payload;
        draft.selectionSet[sportId] = [];
        break;
      }
      case RESET_CLASSIFIER_SELECTION:
        draft.casualSelect = 'all';
        draft.selectionSet = {};
        break;
      case UPDATE_CLASSIFIER_DATA: {
        Object.entries(action.payload.sport).forEach(([sportId, sport]) => {
          if (!sport) {
            // remove sport
            delete draft.entity[sportId];
          } else if (!draft.entity[sportId]) {
            // add sport
            draft.entity[sportId] = {
              ...sport,
              region: undefined,
              competition: {},
            };
            Object.values(sport.region).forEach(region => {
              Object.entries(region.competition).forEach(
                ([competitionId, competition]) => {
                  draft.entity[sportId].competition[
                    competitionId
                  ] = competition;
                },
              );
            });
          } else {
            // update sport
            Object.values(sport.region).forEach(region => {
              Object.entries(region.competition).forEach(
                ([competitionId, competition]) => {
                  if (!competition) {
                    // remove competition
                    delete draft.entity[sportId].competition[competitionId];
                  } else if (
                    !draft.entity[sportId].competition[competitionId]
                  ) {
                    // add competition
                    draft.entity[sportId].competition[
                      competitionId
                    ] = competition;
                  } else {
                    // update competition
                    Object.entries(competition.game).forEach(
                      ([gameId, game]) => {
                        if (!game) {
                          //remove game
                          delete draft.entity[sportId].competition[
                            competitionId
                          ].game[gameId];
                        } else {
                          // add game
                          draft.entity[sportId].competition[competitionId].game[
                            gameId
                          ] = game;
                        }
                      },
                    );
                  }
                },
              );
            });
          }
        });
        break;
      }
    }
  });
