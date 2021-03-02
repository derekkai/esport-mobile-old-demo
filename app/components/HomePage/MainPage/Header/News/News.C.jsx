import { connect } from 'react-redux';
import { openModal } from 'reducers/global';
import component from './News';

const mapStateToProps = state => ({
  entity: state.news.entity,
  length: state.news.entity.length,
});

const mapDispatchToProps = dispatch => ({
  openModal: param => dispatch(openModal(param)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(component);
