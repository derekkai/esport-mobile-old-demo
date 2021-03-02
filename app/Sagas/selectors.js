const selectSummaryListType = state => state.global.summaryListType;
const selectCasualSelect = state => state.classifier.casualSelect;
const selectSelectionSet = state => state.classifier.selectionSet;
const selectClassifierEntity = state => state.classifier.entity;
const selectMarketGameId = state => state.global.marketGameInfo.id;
const selectSummaryListDateRange = state => state.global.summaryListDateRange;
const selectGameResultKeys = state => state.gameResult.keys;
const selectPathname = state => state.router.location.pathname;
const selectAuthToken = state => state.account.AuthToken;
const selectIsLogin = state => state.account.isLogin;
const selectBalanceHistoryDateRange = state => state.balanceHistory.dateRange;
const selectBetHistoryDateRange = state => state.betHistory.dateRange;

const selectBetslipEntity = state => state.betslip.entity;
const selectStake = state => state.betslip.stake;
const selectBetType = state => state.betslip.betType;
const selectSystemNum = state => state.betslip.systemNum;
const selectBetslipKeys = state => state.betslip.keys;
const selectPriceChangeHandleType = state =>
  state.betslip.priceChangeHandleType;
const selectGameLimit = state => state.betslip.gameLimit;
const selectSystemBetCount = state => state.betslip.systemBetCount;
const selectLanguage = state => state.language.locale;
const selectAccountLang = state => state.account.lang;

export {
  selectSummaryListType,
  selectCasualSelect,
  selectSelectionSet,
  selectClassifierEntity,
  selectMarketGameId,
  selectSummaryListDateRange,
  selectGameResultKeys,
  selectPathname,
  selectAuthToken,
  selectBalanceHistoryDateRange,
  selectBetHistoryDateRange,
  selectBetslipEntity,
  selectStake,
  selectBetType,
  selectSystemNum,
  selectBetslipKeys,
  selectPriceChangeHandleType,
  selectGameLimit,
  selectSystemBetCount,
  selectIsLogin,
  selectLanguage,
  selectAccountLang,
};
