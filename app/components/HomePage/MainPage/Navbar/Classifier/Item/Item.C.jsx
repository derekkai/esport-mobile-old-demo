import { connect } from 'react-redux';
import { setClassifierCasualSelect } from 'reducers/classifier';
import component from './Item';

const mapStateToProps = (state, props) => {
  const gameData = state.classifier.entity[props.sportId];

  let gameCount = 0;
  Object.values(gameData.competition).forEach(competition => {
    if (competition.game) gameCount += Object.keys(competition.game).length;
  });
  return {
    gameCount,
  };
};

const mapDispatchToProps = dispatch => ({
  setClassifierCasualSelect: param =>
    dispatch(setClassifierCasualSelect(param)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(component);
