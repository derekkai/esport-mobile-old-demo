import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { FormattedMessage as T } from 'react-intl';
import { dm } from 'helpers/language';
import { timeConvert } from 'helpers/common';
import { NavLink } from 'react-router-dom';
import TeamIcon from 'components/ShareComponent/TeamIcon/TeamIcon';
import videoPlay from 'images/icon_gamelist_livegame.png';
import SportIcon from 'components/ShareComponent/SportIcon/SportIcon';
import OddsC from 'components/ShareComponent/Odds/Odds.C';
import style from './Item.scss';

const Item = ({
  gameId,
  competitionName,
  sportId,
  time,
  team1Name,
  team2Name,
  team1Id,
  team2Id,
  team1Price,
  team2Price,
  team1EventId,
  team2EventId,
  marketCount,
  locked,
  isLive,
  marketId,
  fadeInIndex,
  haveVideo,
}) => {
  const [show, setShow] = useState(false);
  const { hours, day, minute, month } = timeConvert(time);
  const oddName = `${team1Name} vs ${team2Name}`;
  const timeShow = isLive ? 'Live' : `${month}/${day} ${hours}:${minute}`;

  const handleNavLinkClick = e => {
    if (marketCount === 0) e.preventDefault();
  };

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
    <li
      role={gameId}
      className={classNames(style.container, show && style.show)}
    >
      <div className={style.title}>
        <SportIcon className={style.sportIcon} sportId={sportId} type="deep" />
        <div className={style.competitionNameText}>{competitionName}</div>
      </div>
      <div className={style.gameContainer}>
        {haveVideo ? (
          <img className={style.play} src={videoPlay} alt="playing..." />
        ) : (
          <div className={style.timeText}>
            {isLive ? <T {...dm('Live')} /> : timeShow}
          </div>
        )}
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
          <OddsC
            marketId={marketId}
            imgType="4"
            eventId={team1EventId}
            oddName={oddName}
            price={team1Price}
            host={team1Name}
            marketType="独赢"
            time={time}
            locked={locked}
            gameId={gameId}
          />
          <OddsC
            marketId={marketId}
            imgType="4"
            eventId={team2EventId}
            oddName={oddName}
            price={team2Price}
            host={team2Name}
            marketType="独赢"
            time={time}
            locked={locked}
            gameId={gameId}
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
        <div className={style.marketCountContainer}>
          <div className={style.separate} />
          <NavLink
            to={`/upcoming/market/${gameId}`}
            onClick={handleNavLinkClick}
            className={style.marketCountText}
          >
            <div>
              <T {...dm('Quiz')} />
            </div>
            <div>{`+${marketCount}`}</div>
          </NavLink>
        </div>
      </div>
    </li>
  );
};

export default Item;
