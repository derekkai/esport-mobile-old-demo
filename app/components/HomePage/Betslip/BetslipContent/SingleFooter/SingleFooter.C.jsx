import { connect } from 'react-redux';
import component from './SingleFooter';
import { makeTotalData } from './selectors';

export default connect(makeTotalData)(component);
