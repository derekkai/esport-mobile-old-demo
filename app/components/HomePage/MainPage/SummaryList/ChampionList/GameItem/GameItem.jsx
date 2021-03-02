import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { timeConvert } from 'helpers/common';
import { CSSTransition } from 'react-transition-group';
import TeamIcon from 'components/ShareComponent/TeamIcon/TeamIcon';
import SportIcon from 'components/ShareComponent/SportIcon/SportIcon';
import OddsC from './Odds/Odds.C';
import style from './GameItem.scss';

const GameItem = ({
  startTS,
  competitionIcon,
  competitionName,
  sportId,
  event = {},
  gameId,
  fadeInIndex,
  flag,
  marketType,
  marketId,
}) => {
  const { day, month } = timeConvert(startTS);
  const [show, setShow] = useState(false);

  useEffect(() => {
    let timeout = setTimeout(() => {
      setShow(true);
    }, fadeInIndex * 100);
    return () => {
      clearTimeout(timeout);
      timeout = undefined;
    };
  }, []);

  return (
    <li className={classNames(style.container, show && style.show)}>
      <div className={style.title}>
        <div className={style.dateText}>{`${month}/${day}`}</div>
        <SportIcon className={style.sportIcon} sportId={sportId} type="deep" />
        <div className={style.titleContentText}>
          <CSSTransition
            unmountOnExit
            timeout={300}
            in={flag}
            classNames="fade-text"
          >
            <span className={style.text}>{competitionName}</span>
          </CSSTransition>
          <CSSTransition
            unmountOnExit
            timeout={300}
            in={!flag}
            classNames="fade-text"
          >
            <span className={style.text}>{marketType}</span>
          </CSSTransition>
        </div>
        <TeamIcon
          className={style.competitionIcon}
          teamId={competitionIcon}
          teamName={competitionName}
          size="small"
        />
      </div>
      <div className={style.content}>
        {Object.values(event).map(el => (
          <OddsC
            key={el.id}
            oddName={competitionName}
            time={startTS}
            eventId={el.id}
            marketId={marketId}
            price={el.price}
            host={el.name}
            gameId={gameId}
            marketType={marketType}
          />
        ))}
      </div>
    </li>
  );
};

export default GameItem;
