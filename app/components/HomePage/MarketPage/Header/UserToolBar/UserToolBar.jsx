import React from 'react';
import { NavLink } from 'react-router-dom';
import { FormattedMessage as T } from 'react-intl';
import { dm } from 'helpers/language';
import settings from 'settings';
import style from './UserToolBar.scss';

const UserToolBar = ({
  competitionName,
  summaryListType,
  isLogin,
  balance,
  openModal,
}) => {
  const handleRecordBtnClick = () => {
    openModal('record');
  };

  return (
    <div className={style.header}>
      <div className={style.leftArea}>
        <NavLink
          className={style.goBackArrowBtn}
          to={summaryListType === 'upcoming' ? '/' : '/result'}
        />
        <span className={style.competitionNameText}>{competitionName}</span>
      </div>
      <div className={style.rightArea}>
        {isLogin && (
          <React.Fragment>
            <button
              type="button"
              className={style.recordBtn}
              onClick={handleRecordBtnClick}
            >
              <span className={style.text}>
                <T {...dm('Record')} />
              </span>
            </button>
            <button type="button" className={style.balanceBtn}>
              <span className={style.balance}>{`${balance.toFixed(
                settings.balanceDecimalPlaceDisplay,
              )}￥`}</span>
            </button>
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default UserToolBar;
