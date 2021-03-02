import React from 'react';
import classNames from 'classnames';
import style from './Item.scss';

const Item = ({
  name,
  competitionId,
  casualSelect,
  setClassifierSelectionSet,
  isSelect,
}) => {
  const handleItemClick = () => {
    setClassifierSelectionSet({
      sportId: casualSelect,
      competition: competitionId,
    });
  };

  return (
    <li aria-hidden className={style.container} onClick={handleItemClick}>
      <div className={classNames(style.checkbox, isSelect && style.select)} />
      <div className={classNames(style.nameText, isSelect && style.active)}>
        {name}
      </div>
    </li>
  );
};

export default Item;
