import React, { useEffect } from 'react';
import { usePrevious, useOddsStatus } from 'helpers/customHooks';
import settings from 'settings';
import classNames from 'classnames';
import SmartButton from 'components/ShareComponent/SmartButton/SmartButton';
import style from './Odds.scss';

const Odds = ({
  marketId,
  imgType,
  gameId,
  locked,
  isInBetslip,
  price,
  addBet,
  oddName,
  host,
  marketType,
  time,
  eventId,
  position = undefined,
  className,
  isTag,
  removeBetsKey,
  requestUpdateBetEventData,
}) => {
  let prePrice = usePrevious(price);
  const [oddsStatus, isArrowUp] = useOddsStatus(
    price,
    prePrice,
    isInBetslip,
    locked,
  );

  useEffect(() => {
    if (prePrice !== undefined) {
      prePrice = price;
    }
  }, [eventId]);

  const handleButtonClick = () => {
    if (!isInBetslip) {
      addBet({
        marketId,
        gameId,
        pick: host,
        eventId,
        oddName,
        time,
        marketType,
        price,
      });
    } else {
      removeBetsKey({ eventId, gameId });
      requestUpdateBetEventData();
    }
  };

  return (
    <div
      className={classNames(
        className,
        style.container,
        oddsStatus.current !== 'normal' && style.flicker,
        style[`img${imgType}`],
      )}
    >
      {!locked && (
        <div
          className={classNames(
            style.arrow,
            isArrowUp.current !== '' &&
              style[`${isArrowUp.current ? 'up' : 'down'}`],
            style[position],
          )}
        />
      )}
      <SmartButton
        isTag={isTag}
        img={imgType}
        type={oddsStatus.current}
        text={
          !price || price === 0
            ? undefined
            : price.toFixed(settings.priceDecimalPlaceDisplay)
        }
        onClick={handleButtonClick}
      />
    </div>
  );
};

export default Odds;
