import React, { useEffect, useRef } from 'react';
import { unsubscribeHandler } from 'Sagas/websocket';
import { withListLoading } from 'components/HOCs/hocs';
import style from './GameList.scss';
import ItemC from './Item/Item.C';

const GameList = ({
  keys,
  clearGameUpcomingData,
  setSummaryItemRenderCount,
  summaryItemRenderCount,
}) => {
  const firstRender = useRef(true);
  useEffect(() => {
    let timeout = setTimeout(() => {
      firstRender.current = false;
    }, keys.length * 100);
    return () => {
      unsubscribeHandler('gameUpcoming');
      clearGameUpcomingData();
      setSummaryItemRenderCount(0);
      clearTimeout(timeout);
      timeout = undefined;
    };
  }, []);

  return (
    <ul className={style.list}>
      {keys
        .filter((value, key) => key < summaryItemRenderCount + 30)
        .map((gameId, key) => (
          <ItemC key={gameId} fadeInIndex={key % 30} gameId={gameId} />
        ))}
    </ul>
  );
};

export default withListLoading(GameList);
