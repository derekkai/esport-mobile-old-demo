import React from 'react';
import settings from 'settings';
import { timeConvert } from 'helpers/common';
import { FormattedMessage as T } from 'react-intl';
import { dm } from 'helpers/language';
import SportIcon from 'components/ShareComponent/SportIcon/SportIcon';
import TeamIcon from 'components/ShareComponent/TeamIcon/TeamIcon';
import SmartButton from 'components/ShareComponent/SmartButton/SmartButton';
import style from './SubItem.scss';

const statusColorMap = {
  Won: 'green',
  Lost: 'red',
  NoResulted: 'orange',
  Cancel: 'orange',
  Draw: 'orange',
};

const SubItem = ({
  sportId,
  competitionName,
  matchStartDate,
  team1Id,
  team2Id,
  team1Name,
  team2Name,
  marketName,
  selectionName,
  betSelState,
  price,
}) => {
  const isChampion = team2Id === 0;
  const { hours, day, minute, month } = timeConvert(matchStartDate);
  const date = `${month}/${day} ${hours}:${minute}`;
  return (
    <li className={style.container}>
      <div className={style.infoHeaderDark}>
        <span className={style.section}>
          <SportIcon
            className={style.sportIcon}
            sportId={sportId}
            type="light"
          />
          <span className={style.competitionNameText}>{competitionName}</span>
        </span>
        <span className={style.dateText}>{date}</span>
      </div>
      <div className={style.infoHeader}>
        <span>{marketName}</span>
        <span>{selectionName}</span>
        <span>
          <T {...dm('Odds')} />
          {` ${price.toFixed(settings.priceDecimalPlaceDisplay)}`}
        </span>
      </div>
      <div className={style.gameContainer}>
        <div className={style.teamMatchContainer}>
          <TeamIcon
            className={style.teamIcon}
            size="small"
            teamId={team1Id}
            teamName={team1Name}
          />
          <div className={style.middleArea}>
            <div className={style.teamNameTextLeft}>{team1Name}</div>
            {!isChampion && (
              <React.Fragment>
                <div className={style.vsText}>VS</div>
                <div className={style.teamNameText}>{team2Name}</div>
              </React.Fragment>
            )}
          </div>
          {!isChampion && (
            <TeamIcon
              className={style.teamIcon}
              size="small"
              teamId={team2Id}
              teamName={team2Name}
            />
          )}
        </div>
        <SmartButton
          className={style.oddsBtn}
          img="8"
          type={statusColorMap[betSelState]}
          text={price}
          isTag
        />
      </div>
    </li>
  );
};

export default SubItem;
