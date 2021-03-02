import { connect } from 'react-redux';
import { clearGameUpcomingData } from 'reducers/gameUpcoming';
import { setSummaryItemRenderCount } from 'reducers/global';
import component from './GameList';

const mapStateToProps = state => ({
  loading:
    !state.global.loadDown.summaryList ||
    state.global.loading.classifier ||
    !state.global.loadDown.classifier,
  keys: state.gameUpcoming.keys,
  summaryItemRenderCount: state.global.summaryItemRenderCount,
});

const mapDispatchToProps = dispatch => ({
  setSummaryItemRenderCount: param =>
    dispatch(setSummaryItemRenderCount(param)),
  clearGameUpcomingData: () => dispatch(clearGameUpcomingData()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(component);
