import React from 'react';
import settings from 'settings';
import classNames from 'classnames';
import { timeConvert } from 'helpers/common';
import { FormattedMessage as T } from 'react-intl';
import { dm } from 'helpers/language';
import style from './Item.scss';

const Item = ({ data, setModalBetID }) => {
  const {
    BetID,
    BettingDate,
    BetTypeName,
    BettingAmount,
    BettingResultAmount,
    BetStateName,
  } = data;
  const { hours, day, minute, month } = timeConvert(BettingDate);
  const date = `${month}/${day} ${hours}:${minute}`;
  const handleArrowBtnClick = () => {
    setModalBetID(BetID);
  };
  const surplus = (BettingResultAmount - BettingAmount).toFixed(
    settings.balanceDecimalPlaceDisplay,
  );
  let resultText;
  let isNoMoneyResult = true;
  if (BetStateName === 'Unsettled' || BetStateName === 'Returned')
    resultText = BetStateName;
  else {
    isNoMoneyResult = false;
    resultText = `${surplus}¥`;
  }

  return (
    <React.Fragment>
      <li className={style.container}>
        <div className={style.section}>
          <div className={style.idText}>{BetID}</div>
          <div className={style.timeText}>{date}</div>
        </div>
        <span className={style.typeName}>
          <T {...dm(BetTypeName)} />
        </span>
        <span className={style.amountText}>{`${BettingAmount.toFixed(
          settings.balanceDecimalPlaceDisplay,
        )}¥`}</span>
        <span
          className={classNames(
            style.resultText,
            surplus < 0 && style.negative,
            isNoMoneyResult && style.normal,
          )}
        >
          {isNoMoneyResult ? <T {...dm(BetStateName)} /> : resultText}
        </span>
        <button
          type="button"
          className={style.arrowBtn}
          onClick={handleArrowBtnClick}
        />
      </li>
    </React.Fragment>
  );
};

export default Item;
