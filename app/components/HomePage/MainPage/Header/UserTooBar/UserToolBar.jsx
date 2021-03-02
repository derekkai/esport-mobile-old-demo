import React from 'react';
import userIcon from 'images/icon_member.png';
import mainIcon from 'images/icon_logo_h.png';
import { FormattedMessage as T } from 'react-intl';
import { dm } from 'helpers/language';
import settings from 'settings';
import style from './UserToolBar.scss';

const UserToolBar = ({ isLogin, balance, account, openModal }) => {
  const handleRecordBtnClick = () => {
    openModal('record');
  };

  return (
    <div className={style.header}>
      <div>
        <img className={style.mainIcon} alt="main icon" src={mainIcon} />
      </div>
      <div className={style.user}>
        {isLogin && (
          <React.Fragment>
            <img className={style.userIcon} src={userIcon} alt="user icon" />
            <span className={style.userNameText}>{account}</span>
          </React.Fragment>
        )}
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
