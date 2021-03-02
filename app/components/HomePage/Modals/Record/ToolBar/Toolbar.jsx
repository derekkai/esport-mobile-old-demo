import React from 'react';
import { FormattedMessage as T } from 'react-intl';
import { timeConvert } from 'helpers/common';
import { dm } from 'helpers/language';
import settings from 'settings';
import style from './Toolbar.scss';

const Toolbar = ({
  fromDateTimeStamp,
  toDateTimeStamp,
  activeTab,
  setActiveTab,
  setShowDateRangeModal,
  navId,
}) => {
  const handleTabSelectChange = e => {
    setActiveTab(e.target.value);
  };

  const handleDateRangeSelectClick = () => {
    setShowDateRangeModal(true);
  };

  const fromDateParse = timeConvert(fromDateTimeStamp / 1000);
  const fromDate = `${fromDateParse.month}.${fromDateParse.day}`;

  const toDateParse = timeConvert(toDateTimeStamp / 1000);
  const toDate = `${toDateParse.month}.${toDateParse.day}`;

  return (
    <div className={style.container}>
      {navId === 'betHistory' && (
        <div className={style.selectWrapper}>
          <select
            className={style.select}
            value={activeTab}
            onChange={handleTabSelectChange}
          >
            {Object.entries(settings.betHistroyModal.tabs).map(
              ([key, value]) => (
                <T key={key} {...dm(value.name)}>
                  {message => <option value={key}>{message}</option>}
                </T>
              ),
            )}
          </select>
          <div className={style.arrowBtn} />
        </div>
      )}
      <div className={style.selectWrapper}>
        <div
          aria-hidden
          className={style.dateSelect}
          onClick={handleDateRangeSelectClick}
        >
          <span>
            <T {...dm('From')} />
          </span>
          <span>{fromDate}</span>
          <span>
            <T {...dm('To')} />
          </span>
          <span>{toDate}</span>
        </div>
        <div className={style.arrowBtn} />
      </div>
    </div>
  );
};

export default Toolbar;
