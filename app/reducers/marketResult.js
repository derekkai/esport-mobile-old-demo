import produce from 'immer';
import { pushIdBySort, reduceGroupData } from 'helpers/common';
import settings from 'settings';

const prefix = 'marketResult';
const SET_MARKET_RESULT_DATA = `${prefix}/SET_MARKET_RESULT_DATA`;
const CLEAR_MARKET_RESULT_DATA = `${prefix}/CLEAR_MARKET_RESULT_DATA`;

/**
 * Set market result data.
 * @param {Object} payload market data.
 */
export const setMarketResultData = payload => ({
  type: SET_MARKET_RESULT_DATA,
  payload,
});

/**
 * Clear market result data.
 */
export const clearMarketResultData = () => ({
  type: CLEAR_MARKET_RESULT_DATA,
});

const initalState = {
  keys: {
    0: { name: 'All Games', value: [] },
  },
  entity: {},
};

/* eslint-disable default-case, no-param-reassign */
export default (state = initalState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_MARKET_RESULT_DATA: {
        let keys = { 0: { name: 'All Games', value: [] } };
        Object.values(action.payload.market).forEach(market => {
          if (market.event) {
            const { result } = Object.values(market.event)[0];
            if (result !== settings.eventResultOfNoResult) {
              pushIdBySort(
                action.payload.market,
                market,
                keys[0].value,
                'id' /*'order'*/,
              );
              const { group_id, group_name } = market;
              if (keys[group_id]) {
                pushIdBySort(
                  action.payload.market,
                  market,
                  keys[group_id].value,
                  'id',
                  //'order',
                );
              } else {
                keys[group_id] = {
                  name: group_name,
                  value: [market.id],
                };
              }
            }
          }
        });
        keys = reduceGroupData(keys);
        draft.keys = keys;
        draft.entity = action.payload.market;

        break;
      }
      case CLEAR_MARKET_RESULT_DATA:
        draft.keys = {
          0: { name: 'All Games', value: [] },
        };
        draft.entity = {};
        break;
    }
  });
