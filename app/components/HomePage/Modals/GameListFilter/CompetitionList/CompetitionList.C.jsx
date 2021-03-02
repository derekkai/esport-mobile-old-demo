import { connect } from 'react-redux';
import { selectAllCompetition, clearAllCompetition } from 'reducers/classifier';
import component from './CompetitionList';

const mapStateToProps = state => {
  const keys = [];
  const { casualSelect } = state.classifier;
  Object.values(state.classifier.entity[casualSelect].competition).forEach(
    el => {
      keys.push(el.id);
    },
  );
  const selectable = state.classifier.selectionSet[casualSelect] !== undefined;
  return {
    casualSelect,
    keys,
    selectable,
  };
};

const mapDispatchToProps = dispatch => ({
  selectAllCompetition: param => dispatch(selectAllCompetition(param)),
  clearAllCompetition: param => dispatch(clearAllCompetition(param)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(component);
