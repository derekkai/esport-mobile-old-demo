import React from 'react';
import { timeConvert } from 'helpers/common';
import style from './Item.scss';

const Item = ({ data }) => {
  const { Type, Title, Content, PublishDateTime } = data;
  const iconClassName = Type === 2 ? 'activeIcon' : 'systemIcon';
  const date = new Date(PublishDateTime).getTime();
  const { year, hours, day, minute, month } = timeConvert(date / 1000);
  return (
    <li className={style.container}>
      <div className={style.title}>
        <div className={style[iconClassName]} />
        <div className={style.titleText}>{Title}</div>
        <div
          className={style.timeText}
        >{`${year}/${month}/${day} ${hours}:${minute}`}</div>
      </div>
      <div className={style.content}>
        <span className={style.contentText}>{Content}</span>
      </div>
    </li>
  );
};

export default Item;
