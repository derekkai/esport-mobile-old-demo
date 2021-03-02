import React, { useEffect } from 'react';
import { FormattedMessage as T } from 'react-intl';
import { dm } from 'helpers/language';
import { timeConvert } from 'helpers/common';
import Odds from 'components/ShareComponent/Odds/Odds';
import style from './SingleBetCard.scss';

const SingleBetCard = ({
  time,
  oddName,
  price,
  pick,
  marketType,
  potentialWin,
  stake,
  removeBetsKey,
  updateSingleStake,
  setPotentialWin,
  eventId,
  gameId,
  openKeyBoard,
  setKeyBoardHandleFunc,
}) => {
  useEffect(() => {
    setPotentialWin({
      eventId,
      value: potentialWin,
    });
  }, [potentialWin]);

  const handleRemoveBtnClick = () => {
    removeBetsKey({ eventId, gameId });
  };

  const handleStakeInputClick = () => {
    openKeyBoard(true);
    setKeyBoardHandleFunc(param => {
      updateSingleStake({ eventId, stake: param });
    });
  };

  const { hours, day, minute, month } = timeConvert(time);
  const date = `${month}/${day} ${hours}:${minute}`;
  const displayStake = stake === 0 ? 'Stake' : stake;

  return (
    <div className={style.container}>
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
            locked={false}
            price={price}
            isInBetslip={false}
          />
          <div className={style.section}>
            <div>{marketType}</div>
            <div>{pick}</div>
          </div>
        </div>
        <div
          aria-hidden
          onClick={handleStakeInputClick}
          className={style.stakeInput}
        >
          <span>
            <T {...dm(displayStake)} />
          </span>
        </div>
      </div>
      <div className={style.footer}>
        <span className={style.dateText}>{date}</span>
        <span className={style.earnText}>
          <T {...dm('Potential Win')} />
          {`: ${potentialWin}¥`}
        </span>
      </div>
    </div>
  );
};

export default SingleBetCard;
