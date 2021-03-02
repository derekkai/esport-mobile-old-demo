import { connect } from 'react-redux';
import { openModal } from 'reducers/global';
import component from './BetslipTag';

const mapStateToProps = state => ({
  betCount: state.betslip.keys.length,
});

const mapDispatchToProps = dispatch => ({
  openModal: param => dispatch(openModal(param)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(component);
