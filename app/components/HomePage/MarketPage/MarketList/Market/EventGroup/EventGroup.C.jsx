import { connect } from 'react-redux';
import component from './EventGroup';
import { makeEvents, makeEventResult } from './selectors';

const makeMapStateToProps = () => {
  const getEvents = makeEvents();
  const getEventResult = makeEventResult();

  const mapStateToProps = (state, props) => {
    return {
      events: getEvents(state, props),
      result: getEventResult(state, props),
    };
  };
  return mapStateToProps;
};
export default connect(makeMapStateToProps)(component);
