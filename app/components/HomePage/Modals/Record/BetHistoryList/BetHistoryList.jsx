import React, { useEffect, useState } from 'react';
import { FormattedMessage as T } from 'react-intl';
import { dm } from 'helpers/language';
import Loading from 'components/ShareComponent/Loading/Loading';
import settings from 'settings';
import style from './BetHistoryList.scss';
import Detail from './Detail/Detail';
import Item from './Item/Item';

const BetHistoryList = ({
  clearBetHistory,
  activeTab,
  entity,
  requestBetHistory,
  loading,
}) => {
  const [modalBetID, setModalBetID] = useState('');
  useEffect(() => {
    requestBetHistory();
    return () => {
      clearBetHistory();
    };
  }, []);

  const handleCloseModal = () => {
    setModalBetID('');
  };

  const renderModal = () => {
    if (modalBetID !== '') {
      for (let i = 0; i < entity.length; i += 1) {
        if (entity[i].BetID === modalBetID)
          return <Detail data={entity[i]} closeModal={handleCloseModal} />;
      }
    }
    return undefined;
  };
  return (
    <div className={style.container}>
      <React.Fragment>
        <div className={style.header}>
          <span>
            ID/
            <T {...dm('Time')} />
          </span>
          <span>
            <T {...dm('Bet Type')} />
          </span>
          <span>
            <T {...dm('Stake')} />
          </span>
          <span>
            <T {...dm('Bet Result')} />
          </span>
        </div>
        {loading ? (
          <div className={style.loadingWrapper}>
            <Loading />
          </div>
        ) : (
          <div className={style.listWrapper}>
            <ul className={style.list}>
              {entity
                .filter(el => {
                  if (activeTab === 'all') return true;
                  return settings.APIBetTypeMap[el.BetTypeName] === activeTab;
                })
                .map(el => (
                  <Item
                    key={el.BetID}
                    data={el}
                    setModalBetID={setModalBetID}
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

export default BetHistoryList;
