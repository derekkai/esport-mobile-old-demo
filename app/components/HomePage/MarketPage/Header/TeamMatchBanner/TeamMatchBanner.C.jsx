import { connect } from 'react-redux';
import history from 'utils/history';
import { colorLog } from 'helpers/common';
import component from './TeamMatchBanner';

const mapStateToProps = state => {
  try {
    const { marketGameInfo, summaryListType } = state.global;
    return {
      haveVideo: state.live.keys.includes(marketGameInfo.id),
      team1Name: marketGameInfo.team1_name,
      team2Name: marketGameInfo.team2_name,
      team1Id: marketGameInfo.team1_id,
      team2Id: marketGameInfo.team2_id,
      isLive:
        summaryListType === 'result'
          ? marketGameInfo.is_closed
          : marketGameInfo.type === 1,
      time: marketGameInfo.start_ts,
      sportId: marketGameInfo.sport.id,
      transition: state.global.transition.market >= 1,
      finalScore: marketGameInfo.final_score,
    };
  } catch (e) {
    console.log(e);
    const { pathname } = state.router.location;
    if (pathname.includes('market')) {
      colorLog('Push to root', 'warn');
      history.push('');
    }
  }
};

export default connect(mapStateToProps)(component);
