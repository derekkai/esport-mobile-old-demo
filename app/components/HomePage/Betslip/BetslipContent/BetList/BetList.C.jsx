import { connect } from 'react-redux';
import { removeBetEntity, setBetType } from 'reducers/betslip';
import component from './BetList';

const mapStateToProps = state => {
  return {
    keys: state.betslip.keys,
    modal: state.global.modal,
  };
};

const mapDispatchToProps = dispatch => ({
  removeBetEntity: param => dispatch(removeBetEntity(param)),
  setBetType: param => dispatch(setBetType(param)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(component);
