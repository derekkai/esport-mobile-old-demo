import { connect } from 'react-redux';
import { openModal } from 'reducers/global';
import component from './Navbar';

const mapStateToProps = state => ({
  summaryListType: state.global.summaryListType,
  casualSelect: state.classifier.casualSelect,
});

const mapDispatchToProps = dispatch => ({
  openModal: param => dispatch(openModal(param)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(component);
