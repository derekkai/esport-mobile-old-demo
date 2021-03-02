import React, { useEffect, useState } from 'react';
import { FormattedMessage as T } from 'react-intl';
import { dm } from 'helpers/language';
import Loading from 'components/ShareComponent/Loading/Loading';
import DetailC from './Item/Detail/Detail.C';
import style from './BalanceHistoryList.scss';
import ItemC from './Item/Item.C';

const BalanceHistoryList = ({
  keys,
  loading,
  requestBalanceHistory,
  clearBalanceHistory,
}) => {
  const [modalIndex, setModalIndex] = useState('');
  useEffect(() => {
    requestBalanceHistory();
    return () => {
      clearBalanceHistory();
    };
  }, []);

  const handleCloseModal = () => {
    setModalIndex('');
  };

  const renderModal = () => {
    if (modalIndex !== '') {
      return <DetailC date={keys[modalIndex]} closeModal={handleCloseModal} />;
    }
    return undefined;
  };

  return (
    <div className={style.container}>
      <React.Fragment>
        <div className={style.header}>
          <span>
            <T {...dm('Date')} />
          </span>
          <span>
            <T {...dm('Amount')} />
          </span>
          <span>
            <T {...dm('Balance')} />
          </span>
          <span>
            <T {...dm('Count')} />
          </span>
        </div>
        {loading ? (
          <div className={style.loadingWrapper}>
            <Loading />
          </div>
        ) : (
          <div className={style.listWrapper}>
            <ul className={style.list}>
              {keys.map((el, index) => (
                <ItemC
                  key={el}
                  date={el}
                  index={index}
                  setModalIndex={setModalIndex}
                />
              ))}
            </ul>
          </div>
        )}
      </React.Fragment>
      {renderModal()}
    </div>
  );
};

export default BalanceHistoryList;
