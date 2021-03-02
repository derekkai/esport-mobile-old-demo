import produce from 'immer';
import { pushIdBySort, reduceGroupData } from 'helpers/common';
import extend from 'extend';

const prefix = 'marketUpcoming';
const SET_MARKET_UPCOMING_DATA = `${prefix}/SET_MARKET_UPCOMING_DATA`;
const CLEAR_MARKET_UPCOMING_DATA = `${prefix}/CLEAR_MARKET_UPCOMING_DATA`;
const UPDATE_MARKET_UP_COMING_DATA = `${prefix}/UPDATE_MARKET_UP_COMING_DATA`;

/**
 * Set market upcoming data.
 * @param {Object} payload market data
 */
export const setMarketUpcomingData = payload => ({
  type: SET_MARKET_UPCOMING_DATA,
  payload,
});

/**
 * Clear market upcoming data.
 */
export const clearMarketUpcomingData = () => ({
  type: CLEAR_MARKET_UPCOMING_DATA,
});

/**
 * Update upcoming Market data.
 * @param {Object} payload market update data.
 */
export const updateMarketUpcomingData = payload => ({
  type: UPDATE_MARKET_UP_COMING_DATA,
  payload,
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
      case SET_MARKET_UPCOMING_DATA: {
        let keys = { 0: { name: 'All Games', value: [] } };
        Object.values(action.payload.market).forEach(market => {
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
              //'order',
              'id',
            );
          } else {
            keys[group_id] = {
              name: group_name,
              value: [market.id],
            };
          }
        });
        keys = reduceGroupData(keys);
        draft.keys = keys;
        draft.entity = action.payload.market;
        break;
      }
      case CLEAR_MARKET_UPCOMING_DATA:
        draft.keys = {
          0: { name: 'All Games', value: [] },
        };
        draft.entity = {};
        break;
      case UPDATE_MARKET_UP_COMING_DATA: {
        Object.values(action.payload.sport).forEach(sport => {
          Object.values(sport.region).forEach(region => {
            Object.values(region.competition).forEach(competition => {
              Object.values(competition.game).forEach(game => {
                if (!game) {
                  draft.entity = {};
                  draft.keys = {
                    0: { name: 'All Games', value: [] },
                  };
                } else {
                  Object.entries(game.market).forEach(([key, market]) => {
                    const marketId = Number(key);
                    if (!market) {
                      // remove market
                      // remove from  group
                      Object.entries(draft.keys).forEach(([groupId, group]) => {
                        const index = group.value.indexOf(marketId);
                        if (index !== -1) {
                          draft.keys[groupId].value.splice(index, 1);
                        }
                      });
                      delete draft.entity[marketId];
                    } else if (!state.keys[0].value.includes(marketId)) {
                      // add market
                      draft.entity[marketId] = market;
                      pushIdBySort(
                        draft.entity,
                        market,
                        draft.keys[0].value,
                        'id',
                        // 'order',
                      );
                      // check if new group name.
                      if (market.group_id) {
                        if (state.keys[market.group_id]) {
                          pushIdBySort(
                            draft.entity,
                            market,
                            draft.keys[market.group_id].value,
                            'id',
                            // 'order',
                          );
                        } else {
                          draft.keys[market.group_id] = {
                            name: market.group_name,
                            value: [marketId],
                          };
                        }
                      }
                    } else if (market.event) {
                      // update event
                      // extend(true, draft.entity[id], market);
                      Object.entries(market.event).forEach(
                        ([eventId, event]) => {
                          if (!event) {
                            delete draft.entity[marketId].event[eventId];
                          } else if (draft.entity[marketId]?.event?.[eventId]) {
                            extend(
                              true,
                              draft.entity[marketId].event[eventId],
                              event,
                            );
                          } else {
                            if (!draft.entity[marketId].event) {
                              draft.entity[marketId].event = {};
                            }
                            draft.entity[marketId].event[eventId] = event;
                          }
                        },
                      );
                    }
                  });
                }
              });
            });
          });
        });
        break;
      }
    }
  });
