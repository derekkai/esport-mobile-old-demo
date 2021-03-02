import React, { useEffect, useState } from 'react';
import { FormattedMessage as T } from 'react-intl';
import { dm } from 'helpers/language';
import classNames from 'classnames';
import style from './BetslipTag.scss';

const BetslipTag = ({ betCount, openModal }) => {
  const [showTag, setShowTag] = useState(false);
  useEffect(() => {
    if (betCount > 0) {
      setShowTag(true);
    } else {
      setShowTag(false);
    }
  }, [betCount]);

  const handleBetslipBtnClick = () => {
    openModal('betslip');
  };

  return (
    <button
      type="button"
      className={classNames(style.betslipTag, showTag && style.showTag)}
      onClick={handleBetslipBtnClick}
    >
      <span>
        <T {...dm('Betslip')} />
      </span>
      <div className={style.badges}>
        <span>{betCount}</span>
      </div>
    </button>
  );
};

export default BetslipTag;
