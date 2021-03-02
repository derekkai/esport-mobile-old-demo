import React from 'react';
import classNames from 'classnames';
import settings from 'settings';
import style from './Item.scss';

const Item = ({ date, count, total, balance, index, setModalIndex }) => {
  const [year, month, day] = date.split('-');

  const handleArrowBtnClick = () => {
    setModalIndex(index);
  };

  return (
    <li className={style.container}>
      <span>
        <div>{year}</div>
        <div>{`${month}/${day}`}</div>
      </span>
      <span
        className={classNames(style.total, total < 0 && style.negative)}
      >{`${total.toFixed(settings.balanceDecimalPlaceDisplay)} ￥`}</span>
      <span>{`${balance.toFixed(
        settings.balanceDecimalPlaceDisplay,
      )} ￥`}</span>
      <span>{`+ ${count}`}</span>
      <button
        type="button"
        className={style.arrowBtn}
        onClick={handleArrowBtnClick}
      />
    </li>
  );
};
export default Item;
