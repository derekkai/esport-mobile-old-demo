import React from 'react';
import settings from 'settings';
import { createDateRange } from 'helpers/common';
import DatePicker from 'components/ShareComponent/DatePicker/DatePicker';
import style from './DateRangeModal.scss';

const DateRangeModal = ({
  setBetHistoryDateRange,
  navId,
  setShowDateRangeModal,
  setBalanceHistoryDateRange,
  fromDate,
  toDate,
}) => {
  const handleCloseBtnClick = () => {
    setShowDateRangeModal(false);
  };
  const handleDatePickerChange = param => {
    const { startDate, endDate } = param;
    if (navId === 'betHistory') {
      setBetHistoryDateRange({
        startDate: startDate.getTime(),
        endDate: endDate.getTime(),
      });
    } else {
      setBalanceHistoryDateRange({
        startDate: startDate.getTime(),
        endDate: endDate.getTime(),
      });
    }
  };

  const handleDateReset = () => {
    const { from, to } = createDateRange(
      true,
      navId === 'betHistory'
        ? settings.betHistoryDefaultDateRange
        : settings.balanceHistoryDefaultDateRange,
    );
    if (navId === 'betHistory') {
      setBetHistoryDateRange({
        startDate: from,
        endDate: to,
      });
    } else {
      setBalanceHistoryDateRange({
        startDate: from,
        endDate: to,
      });
    }
  };

  return (
    <div className={style.mask}>
      <div>
        <button
          type="button"
          className={style.closeBtn}
          onClick={handleCloseBtnClick}
        />
        <div className={style.content}>
          <DatePicker
            fromDate={fromDate}
            toDate={toDate}
            datePickerMode="past"
            onChange={handleDatePickerChange}
            reset={handleDateReset}
          />
        </div>
      </div>
    </div>
  );
};

export default DateRangeModal;
