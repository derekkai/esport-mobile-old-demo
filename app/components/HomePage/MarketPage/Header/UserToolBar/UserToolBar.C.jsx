import { connect } from 'react-redux';
import { openModal } from 'reducers/global';
import component from './UserToolBar';

const mapStateToProps = state => {
  const { sport, competition } = state.global.marketGameInfo;
  let competitionName;
  if (!state.classifier.entity[sport.id]) {
    competitionName = '';
  } else {
    competitionName =
      state.classifier.entity[sport.id]?.competition[competition.id]?.name ||
      '';
  }
  return {
    isLogin: state.account.isLogin,
    balance: state.account.balance,
    summaryListType: state.global.summaryListType,
    competitionName,
  };
};

const mapDispatchToProps = dispatch => ({
  openModal: param => dispatch(openModal(param)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(component);
