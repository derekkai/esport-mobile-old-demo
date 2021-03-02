import React, { useEffect, useRef } from 'react';
import { FormattedMessage as T } from 'react-intl';
import { dm } from 'helpers/language';
import { withModalFade } from 'components/HOCs/hocs';
import style from './News.scss';
import Item from './Item/Item';

const News = ({ close, entity }) => {
  const handleCloseBtnClick = () => {
    close();
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className={style.container}>
      <div
        aria-hidden
        className={style.closeBtn}
        onClick={handleCloseBtnClick}
      />
      <div className={style.content}>
        <div className={style.header}>
          <h5>
            <T {...dm('News')} />
          </h5>
        </div>
        {entity.length === 0 ? (
          <div className={style.noDataContainer}>
            <span>
              <T {...dm('No data.')} />
            </span>
          </div>
        ) : (
          <ul className={style.list}>
            {entity.map((value, key) => (
              <Item key={key} data={value} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default withModalFade(News)('news');
