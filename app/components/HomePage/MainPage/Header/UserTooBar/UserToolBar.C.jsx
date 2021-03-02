import { connect } from 'react-redux';
import { openModal } from 'reducers/global';
import component from './UserToolBar';

const mapStateToProps = state => ({
  isLogin: state.account.isLogin,
  balance: state.account.balance,
  account: state.account.account,
});

const mapDispatchToProps = dispatch => ({
  openModal: param => dispatch(openModal(param)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(component);
