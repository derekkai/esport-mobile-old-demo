import React from 'react';
import classNames from 'classnames';
import SportIcon from 'components/ShareComponent/SportIcon/SportIcon';
import style from './Item.scss';

const Item = ({ sportId, gameCount, active, setClassifierCasualSelect }) => {
  const handleClick = () => {
    if (!active) setClassifierCasualSelect(sportId);
  };

  return (
    (gameCount !== 0 || sportId === 'all') && (
      <div
        aria-hidden
        className={classNames(style.sportWrapper, active && style.active)}
        onClick={handleClick}
      >
        <SportIcon
          className={style.teamIcon}
          sportId={sportId === 'all' ? 'allgame' : sportId}
          type={active ? 'active' : 'menu'}
        />
        <span className={style.marketCountText}>{gameCount}</span>
      </div>
    )
  );
};

export default Item;
