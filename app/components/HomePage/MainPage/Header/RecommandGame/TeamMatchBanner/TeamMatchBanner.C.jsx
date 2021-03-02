import { connect } from 'react-redux';
import { setSummaryListType } from 'reducers/global';
import {
  requestClassifierData,
  resetClassifierSelection,
} from 'reducers/classifier';
import component from './TeamMatchBanner';

import { makePriceByEventName, makeEventIdByEventName } from './selectors';

const makeMapStateToProps = () => {
  const getPrice1ByEventName = makePriceByEventName('W1');
  const getPrice2ByEventName = makePriceByEventName('W2');
  const getEventId1ByEventName = makeEventIdByEventName('W1');
  const getEventId2ByEventName = makeEventIdByEventName('W2');
  const mapStateToProps = (state, props) => {
    try {
      let locked = false;
      const gameInfo = state.recommandGame.entity[props.gameId];
      const { markets_count, event } = gameInfo;
      if (markets_count === 0 || !event) {
        locked = true;
      }
      return {
        locked,
        time: gameInfo.start_ts,
        team1Name: gameInfo.team1_name,
        team2Name: gameInfo.team2_name,
        team1Price: locked ? 0 : getPrice1ByEventName(state, props),
        team2Price: locked ? 0 : getPrice2ByEventName(state, props),
        team1EventId: locked ? 0 : getEventId1ByEventName(state, props),
        team2EventId: locked ? 0 : getEventId2ByEventName(state, props),
        team1Id: gameInfo.team1_id,
        team2Id: gameInfo.team2_id,
        count: gameInfo.markets_count,
        isLive: gameInfo.type === 1,
        marketId: gameInfo.marketId,
        sportId: gameInfo.sport.id,
      };
    } catch (e) {
      console.error(e);
      console.error(props.gameId);
    }
  };
  return mapStateToProps;
};

const mapDispatchToProps = dispatch => ({
  setSummaryListType: param => dispatch(setSummaryListType(param)),
  requestClassifierData: () => dispatch(requestClassifierData()),
  resetClassifierSelection: () => dispatch(resetClassifierSelection()),
});

export default connect(
  makeMapStateToProps,
  mapDispatchToProps,
)(component);
