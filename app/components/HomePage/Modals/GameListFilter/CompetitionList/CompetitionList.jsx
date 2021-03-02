import React from 'react';
import ItemC from './Item/Item.C';
import { FormattedMessage as T } from 'react-intl';
import { dm } from 'helpers/language';
import style from './CompetitionList.scss';

const CompetitionList = ({
  casualSelect,
  keys,
  selectAllCompetition,
  clearAllCompetition,
}) => {
  const handleSelectAllBtnClick = () => {
    selectAllCompetition(casualSelect);
  };

  const handleClearBtnClick = () => {
    clearAllCompetition(casualSelect);
  };

  return (
    <div className={style.listContainer}>
      <div className={style.titleBar}>
        <button type="button" onClick={handleSelectAllBtnClick}>
          <T {...dm('Select All')} />
        </button>
        <button type="button" onClick={handleClearBtnClick}>
          <T {...dm('Clear')} />
        </button>
      </div>
      <div className={style.listBg}>
        <ul className={style.list}>
          {keys.map(competitionId => (
            <ItemC competitionId={competitionId} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CompetitionList;
