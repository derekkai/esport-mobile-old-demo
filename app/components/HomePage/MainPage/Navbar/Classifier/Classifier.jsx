import React, { useEffect } from 'react';
import FirstItemC from './FirstItem/FirstItem.C';
import ItemC from './Item/Item.C';
import style from './Classifier.scss';

const Classifier = ({
  casualSelect,
  summaryListType,
  resetClassifierSelection,
  requestClassifierData,
  keys,
  loadDown,
}) => {
  useEffect(() => {
    if (
      (summaryListType === 'news' && !loadDown) ||
      summaryListType !== 'news'
    ) {
      resetClassifierSelection();
      requestClassifierData();
    }
  }, [summaryListType]);

  const activeIndex = () => {
    if (casualSelect === 'all') return 0;

    return keys.indexOf(casualSelect) + 1;
  };

  return (
    <div className={style.gameContainer}>
      <FirstItemC sportId="all" />
      {keys.map(sportId => (
        <ItemC
          active={sportId === casualSelect}
          key={sportId}
          sportId={sportId}
        />
      ))}
      <div
        className={style.spotlight}
        style={{ left: `${activeIndex() * 64}px` }}
      />
    </div>
  );
};
export default Classifier;
