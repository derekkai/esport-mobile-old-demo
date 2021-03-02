import { connect } from 'react-redux';
import { setSummaryDateRange } from 'reducers/global';
import component from './GameListFilter';

const mapStateToProps = state => ({
  fromDate: state.global.summaryListDateRange.from,
  toDate: state.global.summaryListDateRange.to,
  summaryListType: state.global.summaryListType,
  casualSelect: state.classifier.casualSelect,
});

const mapDispatchToProps = dispatch => ({
  setSummaryDateRange: param => dispatch(setSummaryDateRange(param)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(component);
