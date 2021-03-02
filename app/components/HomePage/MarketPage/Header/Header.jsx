import React from 'react';
import classNames from 'classnames';
import style from './Header.scss';
import UserToolBarC from './UserToolBar/UserToolBar.C';
import TeamMatchBannerC from './TeamMatchBanner/TeamMatchBanner.C';

const Header = ({ setVideoOpen, isVideoOpen, loadDown }) => {
  return (
    <header className={classNames(style.container, isVideoOpen && style.close)}>
      {/* {loadDown && (
   
      )} */}
      <React.Fragment>
        <UserToolBarC />
        <TeamMatchBannerC setVideoOpen={setVideoOpen} />
      </React.Fragment>
    </header>
  );
};

export default Header;
