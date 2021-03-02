import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import style from './Modals.scss';
import GameListFilterC from './GameListFilter/GameListFilter.C';
import Record from './Record/Record';
import NewsC from './News/News.C';
import Common from './Common/Common';

const Modals = ({ modal, close }) => {
  const handleModalOnClose = () => {
    close();
  };

  return (
    <React.Fragment>
      <div className={classNames(style.mask, modal !== '' && style.visible)} />
      <NewsC modal={modal} close={handleModalOnClose} />
      <Record modal={modal} close={handleModalOnClose} />
      <GameListFilterC modal={modal} close={handleModalOnClose} />
      <Common modal={modal} />
    </React.Fragment>
  );
};

Modals.propTypes = {
  modal: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired,
};

export default Modals;
