import { connect } from 'react-redux';
import { openKeyBoard } from 'reducers/global';
import component from './KeyBoard';

const mapStateToProps = state => ({
  isKeyBoardOpen: state.global.isKeyBoardOpen,
  keyBoardHandleFunc: state.global.keyBoardHandleFunc,
});

const mapDispatchToProps = dispatch => ({
  openKeyBoard: param => dispatch(openKeyBoard(param)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(component);
