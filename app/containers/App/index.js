/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import initalSaga from 'Sagas';
import HomePage from 'components/HomePage/Loadable';
import NotFoundPage from 'components/NotFoundPage/Loadable';
import 'global.css/app.global.scss?global';
import 'global.css/reactTransitionGroup.scss?global';

function App() {
  initalSaga();

  return (
    <React.Fragment>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route
          path={['/upcoming', '/result', '/champion']}
          component={HomePage}
        />
        <Route component={NotFoundPage} />
      </Switch>
    </React.Fragment>
  );
}
export default App;
