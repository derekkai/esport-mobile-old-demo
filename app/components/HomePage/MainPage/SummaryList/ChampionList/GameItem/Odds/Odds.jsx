import React, { useEffect } from 'react';
import classNames from 'classnames';
import { usePrevious, useOddsStatus } from 'helpers/customHooks';
import style from './Odds.scss';

const Odds = ({
  marketType,
  eventId,
  time,
  host,
  price,
  addBet,
  marketId,
  gameId,
  oddName,
  isInBetslip,
  removeBet,
}) => {
  let prePrice = usePrevious(price);
  const [oddsStatus, isArrowUp] = useOddsStatus(price, prePrice, isInBetslip);

  useEffect(() => {
    if (prePrice !== undefined) {
      prePrice = price;
    }
  }, [eventId]);

  const handleOddsBtnClick = () => {
    if (!isInBetslip) {
      addBet({
        marketId,
        gameId,
        pick: host,
        eventId,
        time,
        price,
        marketType,
        oddName,
      });
    } else {
      removeBet({ eventId, gameId });
    }
  };

  return (
    <button
      className={classNames(style.oddsBtn, style[oddsStatus.current])}
      type="button"
      onClick={handleOddsBtnClick}
    >
      <div className={style.teamNameWrapper}>
        <div className={style.teamNameText}>{host}</div>
      </div>
      <div className={style.priceText}>{price}</div>
      <div className={style.arrowTagWraaper}>
        {isArrowUp.current !== '' && (
          <div
            className={isArrowUp.current ? style.arrowUp : style.arrowDown}
          />
        )}
      </div>
    </button>
  );
};

export default Odds;
