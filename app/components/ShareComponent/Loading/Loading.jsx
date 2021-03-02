import React from 'react';
import style from './Loading.scss';

const Loading = () => {
  return (
    <svg style={{ overflow: 'visible' }} width="20%" viewBox="0 0 32 60">
      <polygon
        className={style.triangle}
        fill="none"
        stroke="#3eabfe"
        strokeWidth="2"
        points="16,0 32,32 0,32"
      />
      <text className={style.loading} x="-3" y="50" fill="#3eabfe">
        Loading...
      </text>
    </svg>
  );
};

export default Loading;
