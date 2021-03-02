import React, { useEffect, useRef, useState } from 'react';
import { useInterval } from 'helpers/customHooks';
import { withListLoading } from 'components/HOCs/hocs';
import { unsubscribeHandler } from 'Sagas/websocket';
import settings from 'settings';
import GameItemC from './GameItem/GameItem.C';
import style from './ChampionList.scss';

const ChampionList = ({ keys, clearGameChampionData }) => {
  const firstRender = useRef(true);
  const [flag, setFlag] = useState(false);
  useInterval(() => {
    setFlag(prevState => !prevState);
  }, settings.championGamelistTitleTransitionTime);

  useEffect(() => {
    let timeout = setTimeout(() => {
      firstRender.current = false;
    }, keys.length * 100);
    return () => {
      unsubscribeHandler('gameChampion');
      clearGameChampionData();
      clearTimeout(timeout);
      timeout = undefined;
    };
  }, []);

  return (
    <ul className={style.list}>
      {keys.map((gameId, key) => (
        <GameItemC
          flag={flag}
          key={gameId}
          gameId={gameId}
          fadeInIndex={firstRender.current ? key : 1}
        />
      ))}
    </ul>
  );
};

export default withListLoading(ChampionList);
