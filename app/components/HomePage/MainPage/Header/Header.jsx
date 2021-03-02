import React from 'react';
import style from './Header.scss';
import NewsC from './News/News.C';
import UserToolBarC from './UserTooBar/UserToolBar.C';
import RecommandGameC from './RecommandGame/RecommandGame.C';

const Header = ({}) => {
  return (
    <header className={style.container}>
      <UserToolBarC />
      <RecommandGameC />
      <NewsC />
    </header>
  );
};

export default Header;
