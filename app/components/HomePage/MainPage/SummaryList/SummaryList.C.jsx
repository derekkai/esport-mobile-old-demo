import { connect } from 'react-redux';
import { requestSummaryListData, clearLoadDownStatus } from 'reducers/global';
import component from './SummaryList';

const mapStateToProps = state => ({
  summaryListType: state.global.summaryListType,
});

const mapDispatchToProps = dispatch => ({
  clearLoadDownStatus: param => dispatch(clearLoadDownStatus(param)),
  requestSummaryListData: () => dispatch(requestSummaryListData()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(component);
