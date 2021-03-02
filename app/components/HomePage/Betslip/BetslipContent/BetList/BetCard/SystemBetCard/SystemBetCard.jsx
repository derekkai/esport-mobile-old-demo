import React from 'react';
import classNames from 'classnames';
import { timeConvert } from 'helpers/common';
import Odds from 'components/ShareComponent/Odds/Odds';
import style from './SystemBetCard.scss';

const SystemBetCard = ({
  gameId,
  oddName,
  price,
  marketType,
  pick,
  status,
  time,
  reason,
  removeBetsKey,
  eventId,
}) => {
  const handleRemoveBtnClick = () => {
    removeBetsKey({ eventId, gameId });
  };

  const { hours, day, minute, month } = timeConvert(time);
  const date = `${month}/${day} ${hours}:${minute}`;

  return (
    <div className={classNames(style.container, style[status])}>
      <div className={style.title}>
        <span className={style.titleText}>{oddName}</span>
        <button
          type="button"
          className={style.removeBtn}
          onClick={handleRemoveBtnClick}
        />
      </div>
      <div className={style.content}>
        <div className={style.leftArea}>
          <Odds
            imgType="7"
            isTag
            locked={status === 'close'}
            price={price}
            isInBetslip={false}
          />
          <div className={style.section}>
            <div>{marketType}</div>
            <div>{pick}</div>
          </div>
        </div>
        <span className={style.dateText}>{date}</span>
      </div>
    </div>
  );
};

export default SystemBetCard;
