import { connect } from 'react-redux';
import {
  initalApp,
  setSummaryListType,
  setMainDataViewPoint,
  requestSummaryListData,
  setSummaryItemRenderCount,
} from 'reducers/global';
import component from './HomePage';

const mapStateToProps = state => ({
  mainDataViewPoint: state.global.mainDataViewPoint,
  summaryListLoadDown: state.global.loadDown.summaryList,
  loading: state.global.loading.initalApp && !state.global.loadDown.initalApp,
  summaryListType: state.global.summaryListType,
  summaryItemRenderCount: state.global.summaryItemRenderCount,
  needInit: !state.global.loading.initalApp && !state.global.loadDown.initalApp,
});

const mapDispatchToProps = dispatch => ({
  setSummaryItemRenderCount: param =>
    dispatch(setSummaryItemRenderCount(param)),
  setSummaryListType: param => dispatch(setSummaryListType(param)),
  setMainDataViewPoint: param => dispatch(setMainDataViewPoint(param)),
  initalApp: () => dispatch(initalApp()),
  requestSummaryListData: () => dispatch(requestSummaryListData()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(component);
