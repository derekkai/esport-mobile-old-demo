import { connect } from 'react-redux';
import { closeModal } from 'reducers/global';
import component from './Modals';

const mapStateToProps = state => ({
  modal: state.global.modal,
});

const mapDispatchToProps = dispatch => ({
  close: param => dispatch(closeModal(param)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(component);
