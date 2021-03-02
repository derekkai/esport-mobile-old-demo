import { connect } from 'react-redux';
import component from './GameItem';

const mapStateToProps = (state, props) => {
  const info = state.gameChampion.entity[props.gameId];
  return {
    competitionName: info.team1_name,
    competitionIcon: info.team1_id,
    sportId: info.sport.id,
    event: info.event,
    startTS: info.start_ts,
    marketType: info.market_type,
    marketId: info.marketId,
  };
};

export default connect(mapStateToProps)(component);
