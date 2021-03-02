import React, { useEffect, useRef } from 'react';
import { withListLoading } from 'components/HOCs/hocs';
import style from './ResultList.scss';
import ItemC from './Item/Item.C';

const ResultList = ({ clearGameResultData, keys }) => {
  const prevCount = useRef(0);
  useEffect(() => {
    return () => {
      clearGameResultData();
    };
  }, []);

  useEffect(() => {
    prevCount.current = keys.length;
  }, [keys]);

  return (
    <ul className={style.list}>
      {keys.map((gameId, key) => (
        <ItemC
          key={gameId}
          gameId={gameId}
          fadeInIndex={key - prevCount.current}
        />
      ))}
    </ul>
  );
};

export default withListLoading(ResultList);
