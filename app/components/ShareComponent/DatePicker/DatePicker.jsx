import React, { useState, useEffect } from 'react';
import { FormattedMessage as T } from 'react-intl';
import { dm } from 'helpers/language';
import Picker from 'react-datepicker';
import zhCN from 'date-fns/locale/zh-CN';
import 'react-datepicker/dist/react-datepicker.css';
import './react-datepicker.scss?global';
import style from './DatePicker.scss';

const DatePicker = ({ datePickerMode, fromDate, toDate, onChange, reset }) => {
  const [isFirstDate, setIsFirstDate] = useState(true);
  const [firstDate, setFirstDate] = useState(null);
  const [secondDate, setSecondDate] = useState(null);

  const handleChange = date => {
    if (isFirstDate) {
      setFirstDate(date);
      setIsFirstDate(false);
    } else {
      setSecondDate(date);
      setIsFirstDate(true);
    }
  };

  useEffect(() => {
    if (secondDate) {
      if (secondDate > firstDate) {
        const tempDate = secondDate;
        tempDate.setHours(23);
        tempDate.setMinutes(59);
        tempDate.setSeconds(59);
        tempDate.setMilliseconds(0);
        onChange({ startDate: firstDate, endDate: secondDate });
      } else {
        const tempDate = firstDate;
        tempDate.setHours(23);
        tempDate.setMinutes(59);
        tempDate.setSeconds(59);
        tempDate.setMilliseconds(0);
        onChange({ startDate: secondDate, endDate: firstDate });
      }
    }
  }, [secondDate]);

  let minDate;
  let maxDate;

  switch (datePickerMode) {
    case 'past': {
      if (isFirstDate) {
        minDate = undefined;
        maxDate = Date.now();
      } else {
        const minDateTemp = new Date(firstDate);
        minDateTemp.setDate(minDateTemp.getDate() - 7);
        minDate = minDateTemp;
        const maxDateTemp = new Date(firstDate);
        maxDateTemp.setDate(maxDateTemp.getDate() + 7);
        if (maxDateTemp.getTime() > new Date().getTime()) {
          maxDate = Date.now();
        } else {
          maxDate = maxDateTemp;
        }
      }
      break;
    }
    case 'future': {
      minDate = Date.now();
      maxDate = undefined;
      break;
    }
    default: {
      minDate = undefined;
      maxDate = undefined;
      break;
    }
  }

  const handleReset = () => {
    reset();
    setIsFirstDate(true);
  };

  return (
    <React.Fragment>
      <Picker
        inline
        locale={zhCN}
        startDate={isFirstDate && fromDate}
        endDate={isFirstDate && toDate}
        maxDate={maxDate}
        minDate={minDate}
        onChange={handleChange}
      />
      <div className={style.btnWrapper}>
        <button className={style.btn} type="button" onClick={handleReset}>
          <span>
            <T {...dm('Reset')} />
          </span>
        </button>
      </div>
    </React.Fragment>
  );
};

export default DatePicker;
