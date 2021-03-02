import React, { useState, useEffect } from 'react';
import { FormattedMessage as T } from 'react-intl';
import { dm } from 'helpers/language';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import TeamIcon from 'components/ShareComponent/TeamIcon/TeamIcon';
import { timeConvert } from 'helpers/common';
import SmartButton from 'components/ShareComponent/SmartButton/SmartButton';
import SportIcon from 'components/ShareComponent/SportIcon/SportIcon';
import championIcon from 'images/icon_champion.png';
import style from './Item.scss';

const Item = ({
  sportId,
  competitionName,
  isLive,
  time,
  team1Name,
  team1Id,
  team2Name,
  team2Id,
  score,
  gameId,
  fadeInIndex,
}) => {
  const [show, setShow] = useState(false);
  let winFlagStatus = 0; // 0 hide, 1 left, 2 right
  let isChampion = false;
  if (!team2Id && !team2Name) {
    isChampion = true;
  }
  const { hours, day, minute, month } = timeConvert(time);
  let team1score;
  let team2score;
  if (score && score.includes(':')) {
    [team1score, team2score] = score.split('(')[0].split(':');
  } else {
    team1score = '-';
    team2score = '-';
  }
  if (team1score !== '-' && team2score !== '-') {
    if (Number(team1score) > Number(team2score)) {
      winFlagStatus = 1;
    } else if (Number(team1score) < Number(team2score)) {
      winFlagStatus = 2;
    }
  }
  const timeShow = isLive ? 'Live' : `${month}/${day} ${hours}:${minute}`;
  const renderChampionContent = () => (
    <div className={style.championContent}>
      <img src={championIcon} alt="champion" />
      <TeamIcon teamId={team1Id} teamName={team1Name} />
      <h4>{team1Name}</h4>
    </div>
  );

  const renderVersusContent = () => (
    <React.Fragment>
      <div className={style.teamContainer}>
        <TeamIcon
          className={style.teamIcon}
          teamId={team1Id}
          teamName={team1Name}
          size="small"
        />
        <div className={style.teamNameText}>{team1Name}</div>
      </div>
      <div className={style.odds}>
        <SmartButton img="4" type="normal" text={team1score} isTag />
        <SmartButton img="4" type="normal" text={team2score} isTag />
        <div
          className={classNames(
            style.winFlag,
            winFlagStatus === 1 && style.left,
            winFlagStatus === 2 && style.right,
          )}
        />
      </div>
      <div className={style.teamContainer}>
        <TeamIcon
          className={style.teamIcon}
          teamId={team2Id}
          teamName={team2Name}
          size="small"
        />
        <div className={style.teamNameText}>{team2Name}</div>
      </div>
    </React.Fragment>
  );

  useEffect(() => {
    let timeout = setTimeout(() => {
      setShow(true);
    }, fadeInIndex * 100);
    return () => {
      clearTimeout(timeout);
      timeout = undefined;
    };
  }, []);

  return (
    <li className={classNames(style.container, show && style.show)}>
      <div className={style.title}>
        <SportIcon className={style.sportIcon} sportId={sportId} type="deep" />
        <div className={style.competitionNameText}>{competitionName}</div>
      </div>
      <div className={style.gameContainer}>
        <div className={style.timeText}>{timeShow}</div>
        {isChampion ? renderChampionContent() : renderVersusContent()}
        <NavLink className={style.arrawBtn} to={`/result/market/${gameId}`} />
      </div>
    </li>
  );
};

export default Item;
