import React, { useState, useEffect } from 'react';
import { withModalFade } from 'components/HOCs/hocs';
import style from './Record.scss';
import Navbar from './Navbar/Navbar';
import Toolbar from './ToolBar/Toolbar.C';
import BetHistoryListC from './BetHistoryList/BetHistoryList.C';
import BalanceHistoryListC from './BalanceHistoryList/BalanceHistoryList.C';
import DateRangeModalC from './DateRangeModal/DateRangeModal.C';

const Record = ({ close }) => {
  const [activeTab, setActiveTab] = useState('all');
  const [navId, setNavId] = useState('betHistory');
  const [showDateRangeModal, setShowDateRangeModal] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className={style.container}>
      <div className={style.header}>
        <Navbar close={close} setNavId={setNavId} navId={navId} />
        <Toolbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          navId={navId}
          setShowDateRangeModal={setShowDateRangeModal}
        />
      </div>
      {navId === 'betHistory' ? (
        <BetHistoryListC activeTab={activeTab} />
      ) : (
        <BalanceHistoryListC />
      )}

      {showDateRangeModal && (
        <DateRangeModalC
          navId={navId}
          setShowDateRangeModal={setShowDateRangeModal}
        />
      )}
    </div>
  );
};

export default withModalFade(Record)('record');
