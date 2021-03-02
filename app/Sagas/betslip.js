import { call, takeEvery, select } from 'redux-saga/effects';
import {
  ADD_BET,
  updateBet,
  REQUEST_DO_BET,
  updateDoBetResult,
  setBetPrice,
  REQUEST_UPDATE_BET_EVENT_DATA,
  REMOVE_BETS,
  RESET_BETSLIP,
} from 'reducers/betslip';
import { doBet, getEventData } from '../helpers/commandSender';
import { addReceiver, unsubscribeHandler } from './websocket';
import {
  selectBetslipEntity,
  selectBetslipKeys,
  selectStake,
  selectBetType,
  selectSystemNum,
  selectPriceChangeHandleType,
  selectGameLimit,
  selectSystemBetCount,
} from './selectors';

function* requestUpdateBetEventData() {
  // yield call(unsubscribeHandler, 'betslip');
  // const eventIds = yield select(selectBetslipKeys);
  // if (eventIds.length > 0) {
  //   const entity = yield select(selectBetslipEntity);
  //   const rid = `${Date.now()}@Event`;
  //   // const { eventId } = action.payload;
  //   const gameLimit = yield select(selectGameLimit);
  //   const gameIds = [];
  //   Object.keys(gameLimit).forEach(gameId => {
  //     gameIds.push(Number(gameId));
  //   });
  //   const marketIds = [];
  //   eventIds.forEach(eventId => {
  //     marketIds.push(entity[eventId].marketId);
  //   });
  //   addReceiver(rid, setBetPrice, { subscribeName: 'betslip' }, updateBet);
  //   yield call(getEventData, { rid, gameIds, eventIds, marketIds });
  // }
}

const modeMap = {
  ask: 2,
  upper: 1,
  free: 2,
};

function* requestDoBet() {
  const entity = yield select(selectBetslipEntity);
  const betType = yield select(selectBetType);
  const mode = yield select(selectPriceChangeHandleType);
  const ServerMode = modeMap[mode];
  const arrayData = Object.entries(entity);
  switch (betType) {
    case 'single': {
      for (let i = 0; i < arrayData.length; i += 1) {
        const rid = `${Date.now()}@DoBet_type1_count${i}`;
        const event_id = Number(arrayData[i][0]);
        const { price, stake } = arrayData[i][1];
        addReceiver(rid, updateDoBetResult, {
          event_id,
          totalCount: arrayData.length,
        });
        yield call(doBet, {
          betType,
          rid,
          bets: [{ event_id, price }],
          stake,
          mode: ServerMode,
        });
      }
      break;
    }
    case 'multiple': {
      const rid = `${Date.now()}@DoBet_type2`;
      const stake = yield select(selectStake);
      const bets = [];
      addReceiver(rid, updateDoBetResult);
      for (let i = 0; i < arrayData.length; i += 1) {
        const event_id = Number(arrayData[i][0]);
        const { price } = arrayData[i][1];
        bets.push({ event_id, price });
      }
      yield call(doBet, {
        betType,
        rid,
        bets,
        stake,
        mode: ServerMode,
      });
      break;
    }
    case 'system': {
      const rid = `${Date.now()}@DoBet_type3`;
      const stake = yield select(selectStake);
      const sys_bet = yield select(selectSystemNum);
      addReceiver(rid, updateDoBetResult);
      const bets = [];
      const systemBetCount = yield select(selectSystemBetCount);
      for (let i = 0; i < arrayData.length; i += 1) {
        const event_id = Number(arrayData[i][0]);
        const { price } = arrayData[i][1];
        bets.push({ event_id, price });
      }
      yield call(doBet, {
        betType,
        rid,
        bets,
        stake: stake * systemBetCount,
        sys_bet,
        mode: ServerMode,
      });
      break;
    }
    default:
      break;
  }
}

export default function* watchers() {
  yield takeEvery(REQUEST_DO_BET, requestDoBet);
  yield takeEvery(ADD_BET, requestUpdateBetEventData);
  yield takeEvery(REQUEST_UPDATE_BET_EVENT_DATA, requestUpdateBetEventData);
  yield takeEvery(REMOVE_BETS, requestUpdateBetEventData);
  yield takeEvery(RESET_BETSLIP, requestUpdateBetEventData);
}
