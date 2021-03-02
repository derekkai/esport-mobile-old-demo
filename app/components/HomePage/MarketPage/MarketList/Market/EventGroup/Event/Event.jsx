import React from 'react';
import classNames from 'classnames';
import settings from 'settings';
import SmartButton from 'components/ShareComponent/SmartButton/SmartButton';
import OddsC from 'components/ShareComponent/Odds/Odds.C';
import style from './Event.scss';

const Flag = ({ result }) => {
  switch (result) {
    case settings.eventResultOfWin:
      return (
        <SmartButton
          className={style.oddBtn}
          type="up"
          img="4"
          text="WIN"
          isTag
        />
      );
    case settings.eventResultOfMarketCancel:
    case settings.eventResultOfGameCancel:
      return (
        <SmartButton
          className={style.oddBtn}
          type="cancel"
          img="4"
          text="-"
          isTag
        />
      );
    default:
      return (
        <SmartButton
          className={style.oddBtn}
          type="down"
          img="4"
          text="LOSE"
          isTag
        />
      );
  }
};

const Event = ({
  hideName,
  isFirstGroup,
  marketId,
  gameId,
  summaryListType,
  result,
  name,
  price,
  base,
  right,
  team1Name,
  team2Name,
  time,
  eventId,
  marketName,
  setIsWithTitle = () => {},
}) => {
  const oddName = `${team1Name} vs ${team2Name}`;
  const host = `${name}${base || ''}`;
  let displayName = name;

  if (name.includes('W1')) {
    displayName = team1Name;
  } else if (name.includes('W2')) {
    displayName = team2Name;
  }

  if (hideName && isFirstGroup && base) {
    setIsWithTitle(true);
  }

  return (
    <li className={classNames(style.item, right && style.right)}>
      {hideName && isFirstGroup && base && (
        <div className={style.eventNameText}>{name}</div>
      )}
      <div className={style.container}>
        {(!hideName || !base) && (
          <span className={style.text}>{displayName}</span>
        )}
        {base && <span className={style.text}>{base}</span>}
        {summaryListType === 'result' ? (
          <Flag result={result} />
        ) : (
          <OddsC
            className={style.oddBtn}
            marketId={marketId}
            imgType="4"
            gameId={gameId}
            eventId={eventId}
            oddName={oddName}
            price={price}
            host={host}
            marketType={marketName}
            time={time}
            position={right ? 'right' : 'left'}
          />
        )}
      </div>
    </li>
  );
};

export default Event;
