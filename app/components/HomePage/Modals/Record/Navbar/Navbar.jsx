import React from 'react';
import classNames from 'classnames';
import { FormattedMessage as T } from 'react-intl';
import { dm } from 'helpers/language';
import style from './Navbar.scss';

const navsData = [
  {
    id: 'betHistory',
    name: 'Bet History',
  },
  {
    id: 'balanceHistory',
    name: 'Balance History',
  },
];

const Navbar = ({ close, setNavId, navId }) => {
  const handleCloseBtnClick = () => {
    close();
  };

  const handleNavBtnClick = id => () => {
    setNavId(id);
  };

  let activeTabIndex;
  navsData.forEach((data, key) => {
    if (data.id === navId) activeTabIndex = key;
  });

  return (
    <div className={style.container}>
      <div className={style.navs}>
        <div
          className={style.activeBg}
          style={{ left: `${activeTabIndex * 80}px` }}
        />
        {navsData.map(data => (
          <button
            key={data.id}
            type="button"
            className={classNames(
              style.navBtn,
              data.id === navId && style.active,
            )}
            onClick={handleNavBtnClick(data.id)}
          >
            <span>
              <T {...dm(data.name)} />
            </span>
          </button>
        ))}
      </div>
      <button
        type="button"
        className={style.closeBtn}
        onClick={handleCloseBtnClick}
      />
    </div>
  );
};

export default Navbar;
