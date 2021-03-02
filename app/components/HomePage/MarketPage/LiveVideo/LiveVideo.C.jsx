import { connect } from 'react-redux';
import component from './LiveVideo';

const mapStateToProps = state => {
  const { marketGameInfo } = state.global;
  const gameInfo = state.live.entity[marketGameInfo.id];
  let videoUrl;
  if (gameInfo && gameInfo.video_url) {
    videoUrl = gameInfo.video_url;
  }

  return {
    team1Name: marketGameInfo.team1_name,
    team2Name: marketGameInfo.team2_name,
    team1Id: marketGameInfo.team1_id,
    team2Id: marketGameInfo.team2_id,
    videoUrl,
  };
};

export default connect(mapStateToProps)(component);
