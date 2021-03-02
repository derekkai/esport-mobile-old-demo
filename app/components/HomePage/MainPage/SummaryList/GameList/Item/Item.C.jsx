import { connect } from 'react-redux';
import settings from 'settings';
import { makePriceByEventName, makeEventIdByEventName } from './selectors';
import component from './Item';

const mapStateToProps = (state, props) => {
  try {
    let locked = false;
    const info = state.gameUpcoming.entity[props.gameId];
    const sportId = info.sport.id;
    const { marketId } = info;
    const competitionId = info.competition.id;
    const sportInfo = state.classifier.entity[sportId];
    const competitionName =
      sportInfo && sportInfo.competition && sportInfo.competition[competitionId]
        ? sportInfo.competition[competitionId].name
        : '未知競賽';
    const { markets_count, event } = info;
    if (markets_count === 0 || !event) {
      locked = true;
    }

    const getPrice1ByEventName = makePriceByEventName('W1');
    const getPrice2ByEventName = makePriceByEventName('W2');
    const getEventId1ByEventName = makeEventIdByEventName('W1');
    const getEventId2ByEventName = makeEventIdByEventName('W2');

    return {
      haveVideo: state.live.keys.includes(props.gameId),
      competitionName,
      sportId,
      time: info.start_ts,
      team1Name: info.team1_name,
      team2Name: info.team2_name,
      team1Id: info.team1_id,
      team2Id: info.team2_id,
      team1Price: locked ? 0 : getPrice1ByEventName(state, props),
      team2Price: locked ? 0 : getPrice2ByEventName(state, props),
      team1EventId: locked ? 0 : getEventId1ByEventName(state, props),
      team2EventId: locked ? 0 : getEventId2ByEventName(state, props),
      marketCount: markets_count,
      locked,
      isLive: info.type === 1,
      marketId,
    };
  } catch (e) {
    console.error(e);
    console.error(props.gameId);
  }
};

export default connect(mapStateToProps)(component);
