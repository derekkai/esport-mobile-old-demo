import React from 'react';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { FormattedMessage as T } from 'react-intl';
import { dm } from 'helpers/language';
import settings from 'settings';
import ClassifierC from './Classifier/Classifier.C';
import style from './Navbar.scss';

const Navbar = ({ isFixed, openModal, summaryListType, casualSelect }) => {
  const { tabs } = settings.summaryListData;
  const tabKeys = Object.keys(tabs);
  const activeTabIndex = tabKeys.indexOf(summaryListType);

  const handleFilterBtnClick = () => {
    openModal('gameListFilter');
  };

  return (
    <div className={classNames(style.container, isFixed && style.fixed)}>
      <div className={style.topNavbar}>
        <div className={style.navbarContainer}>
          <div
            className={style.tabHighlightBg}
            style={{
              left: `${33 * activeTabIndex}%`,
            }}
          />
          {Object.entries(tabs).map(([key, value]) => {
            // console.log(summaryListType);
            // console.log(el.name);
            return  <NavLink
            key={value.name}
            to={`/${value.path}`}
            exact
            className={classNames(
              style.tab,
              summaryListType === key && style.highlight,
            )}
          >
            <T {...dm(value.name)} />
          </NavLink>
          }
           
          )}
        </div>
      </div>
      <div className={style.gameNavbar}>
        <button
          // disabled={casualSelect === 'all'}
          type="button"
          className={classNames(
            style.filterBtn,
            // casualSelect === 'all' && style.disable,
          )}
          onClick={handleFilterBtnClick}
        />
        <ClassifierC />
      </div>
    </div>
  );
};
export default Navbar;
