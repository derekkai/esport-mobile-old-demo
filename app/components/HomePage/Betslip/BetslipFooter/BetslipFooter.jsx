import React from 'react';
import { FormattedMessage as T } from 'react-intl';
import { dm } from 'helpers/language';
import classNames from 'classnames';
import style from './BetslipFooter.scss';

const BetslipFooter = ({
  isLogin,
  requestDoBet,
  priceNeverChange,
  priceChangeHandleType,
  betCount,
  isBetStakeCorrent,
  isWaitingResponse,
  showResult,
}) => {
  const disable =
    !isBetStakeCorrent ||
    !isLogin ||
    betCount === 0 ||
    isWaitingResponse ||
    showResult;
  const handleDoBetBtnClick = () => {
    if (!disable) {
      requestDoBet();
    }
  };

  return (
    <button
      type="button"
      className={classNames(style.button, disable && style.disable)}
      onClick={handleDoBetBtnClick}
    >
      {!priceNeverChange && priceChangeHandleType !== 'free' ? (
        <span>
          <T {...dm('Accept changes and place bets.')} />
        </span>
      ) : (
        <span>
          <T {...dm('Place bets!')} />
        </span>
      )}
    </button>
  );
};

export default BetslipFooter;
