import { connect } from 'react-redux';
import { clearGameChampionData } from 'reducers/gameChampion';
import component from './ChampionList';

const mapStateToProps = state => ({
  keys: state.gameChampion.keys,
  loading:
    !state.global.loadDown.summaryList ||
    state.global.loading.classifier ||
    !state.global.loadDown.classifier,
});

const mapDispatchToProps = dispatch => ({
  clearGameChampionData: () => dispatch(clearGameChampionData()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(component);
