import { connect } from 'react-redux';
import {
  setMarketGameInfoGameId,
  requestMarketListData,
  requestMarketGameInfo,
} from 'reducers/global';
import { requestClassifierData } from 'reducers/classifier';
import { clearMarketResultData } from 'reducers/marketResult';
import { clearMarketUpcomingData } from 'reducers/marketUpcoming';
import component from './MarketPage';

const mapStateToProps = state => ({
  haveVideo: state.live.keys.includes(state.global.marketGameInfo.id),
  loadDown:
    state.global.loadDown.battleHeader && state.global.loadDown.classifier,
});

const mapDispatchToProps = dispatch => ({
  requestClassifierData: () => dispatch(requestClassifierData()),
  requestMarketGameInfo: param => dispatch(requestMarketGameInfo(param)),
  requestMarketListData: () => dispatch(requestMarketListData()),
  setMarketGameInfoGameId: param => dispatch(setMarketGameInfoGameId(param)),
  clearMarketUpcomingData: () => dispatch(clearMarketUpcomingData()),
  clearMarketResultData: () => dispatch(clearMarketResultData()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(component);
