import React from 'react';
import classNames from 'classnames';
import { FormattedMessage as T } from 'react-intl';
import { dm } from 'helpers/language';
import style from './Navbar.scss';

const Navbar = ({ isFixed, activeTab, tabs, setActiveTab }) => {
  const handleTabClick = id => () => {
    setActiveTab(id);
  };

  return (
    <div className={classNames(style.wrapper, isFixed && style.fixed)}>
      <div className={style.bg}>
        <div className={style.container}>
          {tabs.map(el => (
            <div
              key={el.id}
              className={classNames(
                style.item,
                activeTab === el.id && style.active,
              )}
            >
              <span aria-hidden onClick={handleTabClick(el.id)}>
                <T {...dm(el.name)} />
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
