import { connect } from 'react-redux';
import component from './Item';

const mapStateToProps = (state, props) => {
  const gameInfo = state.gameResult.entity[props.gameId];
  const { market, is_closed } = gameInfo;
  const sportId = gameInfo.sport.id;
  const competitionId = gameInfo.competition.id;
  const sportInfo = state.classifier.entity[sportId];
  const competitionName = sportInfo.competition[competitionId]?.name || '';
  return {
    isLive: gameInfo.type === 1 && !is_closed,
    time: gameInfo.start_ts,
    team1Name: gameInfo.team1_name,
    team2Name: gameInfo.team2_name,
    team1Id: gameInfo.team1_id,
    team2Id: gameInfo.team2_id,
    market,
    marketCount: gameInfo.markets_count,
    competitionName,
    sportId,
    score: gameInfo.final_score,
  };
};

export default connect(mapStateToProps)(component);
