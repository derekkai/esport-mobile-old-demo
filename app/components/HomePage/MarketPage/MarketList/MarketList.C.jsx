import { connect } from 'react-redux';
import component from './MarketList';
import { makeMarketData } from './selectors';

const mapStateToProps = (state, props) => ({
  loading: state.global.loading.classifier || !state.global.loadDown.classifier,
  data: makeMarketData(state, props),
});

export default connect(mapStateToProps)(component);
