import React, { useEffect } from 'react';
import classNames from 'classnames';
import { Switch, Route } from 'react-router-dom';
import GameListC from './GameList/GameList.C';
import ResultListC from './ResultList/ResultList.C';
import ChampionListC from './ChampionList/ChampionList.C';
import style from './SummaryList.scss';

const SummaryList = ({
  clearLoadDownStatus,
  summaryListType,
  requestSummaryListData,
  isFixed,
}) => {
  useEffect(() => {
    clearLoadDownStatus('summaryList');
    requestSummaryListData();
  }, [summaryListType]);

  return (
    <div className={classNames(style.container, isFixed && style.fixed)}>
      <Switch>
        <Route exact path={['/', '/upcoming']} component={GameListC} />
        <Route path="/result" component={ResultListC} />
        <Route path="/champion" component={ChampionListC} />
      </Switch>
    </div>
  );
};

export default SummaryList;
