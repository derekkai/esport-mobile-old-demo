import { connect } from 'react-redux';
import { requestRecommandGameData } from 'reducers/recommandGame';
import component from './RecommandGame';

const mapStateToProps = state => ({
  keys: state.recommandGame.keys,
});

const mapDispatchToProps = dispatch => ({
  requestRecommandGameData: () => dispatch(requestRecommandGameData()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(component);
