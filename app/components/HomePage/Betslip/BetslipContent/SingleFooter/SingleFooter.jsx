import React from 'react';
import { FormattedMessage as T } from 'react-intl';
import { dm } from 'helpers/language';
import style from './SingleFooter.scss';

const SingleFooter = ({ totalSingleStake, totalPotentialWin, count }) => {
  return (
    <div className={style.container}>
      <span className={style.text}>
        <T
          {...dm('{0} bets, Total {1} ¥')}
          values={{ 0: count, 1: totalSingleStake }}
        />
      </span>
      <span className={style.text}>
        <T {...dm('Potential Win')} />
        {`: ${totalPotentialWin}¥`}
      </span>
    </div>
  );
};

export default SingleFooter;
