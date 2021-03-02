import { connect } from 'react-redux';
import component from './Event';

const mapStateToProps = (state, ownProps) => {
  const { summaryListType } = state.global;
  const { eventId, marketId } = ownProps;
  let eventData;
  switch (summaryListType) {
    case 'upcoming':
      eventData = state.marketUpcoming.entity[marketId].event[eventId];
      break;
    case 'result':
      eventData = state.marketResult.entity[marketId].event[eventId];
      break;
    default:
      eventData = {};
  }
  const { name, price, base, order, result } = eventData;
  return {
    gameId: state.global.marketGameInfo.id,
    eventId,
    summaryListType,
    name,
    price,
    base,
    order,
    result,
    team1Name: state.global.marketGameInfo.team1_name,
    team2Name: state.global.marketGameInfo.team2_name,
    time: state.global.marketGameInfo.start_ts,
  };
};

export default connect(mapStateToProps)(component);
