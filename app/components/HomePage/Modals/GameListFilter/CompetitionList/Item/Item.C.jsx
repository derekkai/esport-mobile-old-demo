import { connect } from 'react-redux';
import { setClassifierSelectionSet } from 'reducers/classifier';
import component from './Item';

const mapStateToProps = (state, props) => {
  const isSelect = state.classifier.selectionSet[
    state.classifier.casualSelect
  ].includes(props.competitionId);

  return {
    name:
      state.classifier.entity[state.classifier.casualSelect].competition[
        props.competitionId
      ].name,
    casualSelect: state.classifier.casualSelect,
    isSelect,
  };
};

const mapDispatchToProps = dispatch => ({
  setClassifierSelectionSet: param =>
    dispatch(setClassifierSelectionSet(param)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(component);
