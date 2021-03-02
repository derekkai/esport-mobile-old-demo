import extend from 'extend';
import React from 'react';
import ReactDOM from 'react-dom';
const Decimal = require('decimal.js');

/**
 * return is obj empty
 * @param {Object} obj target obj
 * @return {boolean}
 */
const isEmpty = obj => Object.keys(obj) === 0;

/**
 * Convert timestamp to a object with hours day minute and month.
 * @param {number} unix timestamp
 * @returns {Object}
 */
const timeConvert = unix => {
  const date = new Date(unix * 1000);
  const year = date.getFullYear();
  const hours = `0${date.getHours()}`.substr(-2);
  const day = `0${date.getDate()}`.substr(-2);
  const minute = `0${date.getMinutes()}`.substr(-2);
  const month = `0${date.getMonth() + 1}`.substr(-2);
  return {
    hours,
    day,
    minute,
    month,
    year,
  };
};

/**
 * Return value under target key in obj.
 * @param {Object} obj source obj
 * @param {string} target target key name
 */
const ObjectFind = (obj, target) => {
  const temp = Object.values(obj);
  for (let i = 0; i < temp.length; i += 1) {
    if (temp[i][target]) {
      return Object.entries(temp[i][target]);
    }
    return ObjectFind(temp[i], target);
  }
  return [];
};

/**
 * Get only number of combinations.
 * @param {number} betCount number of bet.
 * @param {number} sys_bet min of system combinations.
 * @return {number} number of combinations.
 */
const getBetslipOnlySystemCount = (betCount, sys_bet) => {
  const list = [];
  let count = 0;
  for (let index = 0; index < betCount; index += 1) {
    const lst = { items: [...list.filter(el => el.length < sys_bet)] };
    const nArr = [];
    nArr.push(1);
    list.push(nArr);
    for (let lstIndex = 0; lstIndex < lst.items.length; lstIndex += 1) {
      list.push(lst.items[lstIndex].concat(nArr));
      count += 1;
    }
  }
  return count;
};

/**
 * Calculation of betslip total price and system.
 * @param {string} betType bet type
 * @param {Array} eventsPrice array of events price
 * @param {number} sys_bet min system number
 */
const betslipTotalPrice = (betType, eventsPrice, sys_bet) => {
  let systems = {};
  let totalPrice = 0;
  if (betType === 'system') {
    const list = [];
    for (let index = 0; index < eventsPrice.length; index += 1) {
      const lst = { items: [...list.filter(el => el.length < sys_bet)] };
      const nArr = [];
      nArr.push(eventsPrice[index]);
      list.push(nArr);
      for (let lstIndex = 0; lstIndex < lst.items.length; lstIndex += 1) {
        list.push(lst.items[lstIndex].concat(nArr));
      }
    }

    systems = { items: [...list.filter(el => el.length === sys_bet)] };
    for (let index = 0; index < systems.items.length; index += 1) {
      let arrayForCalcPrice = 1;
      for (let callistIndex = 0; callistIndex < sys_bet; callistIndex += 1) {
        const calPrice = systems.items[index][callistIndex];
        arrayForCalcPrice = new Decimal(arrayForCalcPrice)
          .mul(new Decimal(calPrice))
          .toNumber();
      }
      totalPrice = new Decimal(totalPrice)
        .add(new Decimal(arrayForCalcPrice))
        .toNumber();
    }
  } else {
    let arrayForCalcPrice = 1;
    for (let index = 0; index < eventsPrice.length; index += 1) {
      arrayForCalcPrice = new Decimal(arrayForCalcPrice)
        .mul(new Decimal(eventsPrice[index]))
        .toNumber();
      totalPrice = arrayForCalcPrice;
    }
  }
  return {
    systems: systems.items,
    price: totalPrice,
  };
};

/**
 * Get value of parameter in url.
 * @param {string} name parameter name
 * @param {string} url url
 */
/* eslint-disable */
const getParameterByName = (name, url) => {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
};
/* eslint-enable */

/**
 * Return a date range
 * @param {boolean} isPast true for return past date or false as future
 * @param {number} day day
 */
const createDateRange = (isPast, day) => {
  try {
    const today = new Date();
    // to entire date.
    today.setDate(today.getDate() - 1);
    today.setHours(24);
    today.setMinutes(0);
    today.setSeconds(0);
    today.setMilliseconds(0);
    const anotherDay = new Date(today);
    if (isPast) {
      anotherDay.setDate(anotherDay.getDate() - day);
      today.setHours(23);
      today.setMinutes(59);
      return {
        from: anotherDay.getTime(),
        to: today.getTime(),
      };
    }
    anotherDay.setHours(23);
    anotherDay.setMinutes(59);
    anotherDay.setSeconds(59);
    anotherDay.setMilliseconds(0);
    anotherDay.setDate(anotherDay.getDate() + day);
    return {
      from: today.getTime(),
      to: anotherDay.getTime(),
    };
  } catch (e) {
    console.error(e);
    return {
      from: 0,
      to: 0,
    };
  }
};

/**
 * Type cast
 * @param {any} value source
 * @param {string} expectType type
 */
/* eslint-disable valid-typeof */
const typeCasting = (value, expectType) => {
  if (typeof value === expectType) {
    return value;
  }
  switch (expectType) {
    case 'string':
      return value.toString();
    case 'number': {
      const result = Number(value);
      if (Number.isNaN(result)) {
        return value;
      }
      return result;
    }
    default:
      return value;
  }
};

/**
 * millisecond to second
 * @param {number} unix millisecond timestamp
 */
const toSecondTimesStamp = unix => Math.floor(unix / 1000);

/**
 * colorful console log.
 * @param {any} message message
 * @param {string} type text type
 */
const colorLog = (message, type) => {
  let background;

  switch (type) {
    case 'sub_info':
      background = '#00b359';
      break;
    case 'info':
      background = '#0066cc';
      break;
    case 'warn':
      background = '#ffcc00';
      break;
    case 'error':
      background = '  #ff6666';
      break;
    default:
      background = '#6699ff';
      break;
  }
  const styles = `background: ${background}; color: #fff; font-size: 14px;`;
  if (process.env.ENVIRONMENT !== 'production')
    console.log(`⚡ %c${message}`, styles);
};

/* eslint-disable no-param-reassign */
const gamelistDateHandler = (draft, data, needSort) => {
  const gameArray = Object.values(data.game);
  const keys = [];
  for (let i = 0; i < gameArray.length; i += 1) {
    const game = gameArray[i];
    const market = game.market && Object.values(game.market)[0];
    draft.entity[game.id] = {
      ...game,
      market: undefined,
    };
    if (market?.event) {
      draft.entity[game.id].marketId = market.id;
      draft.entity[game.id].event = market.event;
      draft.entity[game.id].market_type = market.market_type;
    }
    if (needSort) {
      pushIdBySort(data.game, game, keys, 'start_ts');
    } else {
      keys.push(game.id);
    }
  }
  draft.keys = keys;
};

/**
 * Game list data update handler
 * @param {Object} draft draft
 * @param {Object} state state
 * @param {Object} data input data.
 * @param {boolean} insertSort is need sort or not.
 */
/* eslint-disable */
const gamelistSubscribeHandler = (draft, data, needSort) => {
  try {
    // create game list
    let gamelist = [];
    Object.values(data.sport).forEach(sport => {
      Object.values(sport.region).forEach(region => {
        Object.values(region.competition).forEach(competition => {
          gamelist = [...gamelist, ...Object.entries(competition.game)];
        });
      });
    });
    // data parsing
    gamelist.forEach(game => {
      const [gameId, gameValue] = game;
      if (!gameValue) {
        // remove game (game: null)
        delete draft.entity[gameId];
        const index = draft.keys.indexOf(Number(gameId));
        if (index !== -1) {
          draft.keys.splice(index, 1);
        }
      } else if (!draft.entity[gameId]) {
        // add game (game not exist)
        // remove layer of market and keep marketId and event
        const market = gameValue.market && Object.values(gameValue.market)[0];
        draft.entity[gameId] = {
          ...gameValue,
          market: undefined,
        };
        if (market?.event) {
          draft.entity[gameId].marketId = market.id;
          draft.entity[gameId].event = market.event;
        }
        // key sort
        if (!needSort) {
          draft.keys.push(gameValue.id);
        } else {
          pushIdBySort(draft.entity, gameValue, draft.keys, 'start_ts');
        }
      } else {
        // update game (game exist)
        Object.entries(gameValue).forEach(props => {
          // parse game update props
          const [propsName, newPropsValue] = props;
          if (propsName !== 'market') {
            // if props not market update
            draft.entity[gameId][propsName] = newPropsValue;
          } else {
            // props is market
            Object.entries(newPropsValue).forEach(([marketId, market]) => {
              if (market?.event) {
                draft.entity[gameId].marketId = Number(marketId);
                Object.entries(market.event).forEach(([eventId, event]) => {
                  // event: null
                  if (!event) {
                    delete draft.entity[gameId].event[eventId];
                  } else if (draft.entity[gameId]?.event?.[eventId]) {
                    // update event
                    extend(true, draft.entity[gameId].event[eventId], event);
                  } else {
                    // add new event
                    if (!draft.entity[gameId].event) {
                      draft.entity[gameId].event = {};
                    }
                    draft.entity[gameId].event[eventId] = event;
                  }
                });
              } else {
                // market: null
                delete draft.entity[gameId].event;
              }
            });
          }
        });
      }
    });
  } catch (e) {
    console.error(e);
  }
};

/**
 * Push id into redux id array with props name by order.
 * @param {Object} origin entity data.
 * @param {Object} target new data.
 * @param {array} storage id array.
 * @param {string} propsName order by props name.
 * @param {boolean} isDesc is desc or asc.
 */
const pushIdBySort = (origin, target, storage, propsName, isDesc = true) => {
  const { id } = target;
  const propsValue = target[propsName];
  let lastElement = true;
  for (let i = 0; i < storage.length; i += 1) {
    const condition = isDesc
      ? origin[storage[i]][propsName] > propsValue
      : origin[storage[i]][propsName] < propsValue;

    if (condition) {
      lastElement = false;
      storage.splice(i, 0, id);
      break;
    }
  }
  if (lastElement) {
    storage.push(id);
  }
};

const reduceGroupData = group => {
  if (group.Others && group[0].value.length === group.Others.value.length) {
    const { Others, ...result } = group;
    return result;
  }
  return group;
};

const displayMaintainPage = () => {
  ReactDOM.render(
    <div className="maintain-bg" />,
    document.getElementById('app'),
  );
};

/* eslint-enable */
export {
  createDateRange,
  isEmpty,
  timeConvert,
  ObjectFind,
  betslipTotalPrice,
  getParameterByName,
  typeCasting,
  toSecondTimesStamp,
  colorLog,
  gamelistSubscribeHandler,
  pushIdBySort,
  getBetslipOnlySystemCount,
  reduceGroupData,
  gamelistDateHandler,
  displayMaintainPage,
};
