import React, { useState } from 'react';
import { FormattedMessage as T } from 'react-intl';
import { dm } from 'helpers/language';
import classNames from 'classnames';
import { createDateRange } from 'helpers/common';
import { withModalFade } from 'components/HOCs/hocs';
import DatePicker from 'components/ShareComponent/DatePicker/DatePicker';
import settings from 'settings';
import style from './GameListFilter.scss';
import CompetitionList from './CompetitionList/CompetitionList.C';

const GameListFilter = ({
  close,
  summaryListType,
  fromDate,
  toDate,
  setSummaryDateRange,
  casualSelect,
}) => {
  let navs = [];
  if (casualSelect === 'all') {
    navs = [{ id: 'date', name: 'Time Range' }];
  } else {
    navs = [
      { id: 'date', name: 'Time Range' },
      { id: 'competition', name: 'Competitions' },
    ];
  }
  const [type, setType] = useState(navs[0].id);
  const handleCloseBtnClick = () => {
    close();
  };

  const handleNavBtnClick = typeName => () => {
    setType(typeName);
  };

  const handleDatePickerChange = param => {
    const { startDate, endDate } = param;
    setSummaryDateRange({
      startDate: startDate.getTime(),
      endDate: endDate.getTime(),
    });
  };

  const handleDateReset = () => {
    const { from, to } = createDateRange(
      summaryListType === 'result',
      settings.defaultDateRange,
    );
    setSummaryDateRange({
      startDate: from,
      endDate: to,
    });
  };

  return (
    <div className={classNames(style.container)}>
      <button
        type="button"
        className={style.closeBtn}
        onClick={handleCloseBtnClick}
      />
      <div className={style.content}>
        <div className={style.nav}>
          {navs.map(nav => (
            <button
              key={nav.id}
              type="button"
              className={classNames(
                type === nav.id && style.select,
                style.navBtn,
              )}
              onClick={handleNavBtnClick(nav.id)}
            >
              <span>
                <T {...dm(nav.name)} />
              </span>
            </button>
          ))}
        </div>
        {type === 'competition' ? (
          <CompetitionList />
        ) : (
          <DatePicker
            fromDate={fromDate}
            toDate={toDate}
            onChange={handleDatePickerChange}
            datePickerMode={summaryListType === 'result' ? 'past' : 'future'}
            reset={handleDateReset}
          />
        )}
      </div>
    </div>
  );
};

export default withModalFade(GameListFilter)('gameListFilter');
