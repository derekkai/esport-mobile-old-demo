import React from 'react';
import { FormattedMessage as T } from 'react-intl';
import { dm } from 'helpers/language';
import classNames from 'classnames';
import settings from 'settings';
import style from './Detail.scss';

const Detail = ({ date, total, balance, data, closeModal }) => {
  const handleCloseBtnClick = () => {
    closeModal();
  };
  const [year, month, day] = date.split('-');

  return (
    <div className={style.mask}>
      <button
        type="button"
        className={style.closeBtn}
        onClick={handleCloseBtnClick}
      />
      <div className={style.container}>
        <div className={style.header}>
          <div className={style.section}>
            <div>{year}</div>
            <div>{`${month}-${day}`}</div>
          </div>
          <span
            className={classNames(style.total, total < 0 && style.negative)}
          >{`${total.toFixed(settings.balanceDecimalPlaceDisplay)} ￥`}</span>
          <span className={style.balance}>
            <T {...dm('Balance')} />
            {`: ${balance.toFixed(settings.balanceDecimalPlaceDisplay)} ￥`}
          </span>
        </div>
        <div className={style.content}>
          <ul className={style.list}>
            {data.map(el => {
              const time = el.TransDate.split(' ')[1];
              const { TransAmount, TransBalance } = el;
              return (
                <li key={el.TransDate + TransBalance}>
                  <span className={style.time}>{time}</span>
                  <span
                    className={classNames(
                      style.amount,
                      TransAmount < 0 && style.negative,
                    )}
                  >
                    {`${TransAmount.toFixed(
                      settings.balanceDecimalPlaceDisplay,
                    )} ￥`}
                  </span>
                  <span className={style.balance}>{`${TransBalance.toFixed(
                    settings.balanceDecimalPlaceDisplay,
                  )} ￥`}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Detail;
