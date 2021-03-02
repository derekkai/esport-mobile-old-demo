import React from 'react';
import { NavLink } from 'react-router-dom';
import { FormattedMessage as T } from 'react-intl';
import { dm } from 'helpers/language';
import OddsC from 'components/ShareComponent/Odds/Odds.C';
import SportIcon from 'components/ShareComponent/SportIcon/SportIcon';
import { timeConvert } from 'helpers/common';
import TeamIcon from 'components/ShareComponent/TeamIcon/TeamIcon';
import style from './TeamMatchBanner.scss';

const TeamMatchBanner = ({
  gameId,
  locked,
  time,
  team1Name,
  team2Name,
  team1Price,
  team2Price,
  team1Id,
  team2Id,
  team1EventId,
  team2EventId,
  count,
  isLive,
  sportId,
  marketId,
  setSummaryListType,
  requestClassifierData,
  resetClassifierSelection,
}) => {
  const { hours, day, minute, month } = timeConvert(time);
  const oddName = `${team1Name} vs ${team2Name}`;
  const handleMarketCountClick = () => {
    setSummaryListType('upcoming');
    resetClassifierSelection();
    requestClassifierData();
  };

  return (
    <div className={style.container}>
      <div className={style.left}>
        <div className={style.section}>
          <div className={style.teamNameTextWrapper}>{team1Name}</div>
          <OddsC
            className={style.oddsBtn}
            marketId={marketId}
            imgType="2left"
            eventId={team1EventId}
            oddName={oddName}
            price={team1Price}
            host={team1Name}
            marketType="独赢"
            time={time}
            locked={locked}
            gameId={gameId}
            position="bottom"
          />
        </div>
        <div className={style.section}>
          <div className={style.teamIconBg}>
            <TeamIcon
              className={style.teamIcon}
              teamId={team1Id}
              teamName={team1Name}
            />
          </div>
        </div>
      </div>
      <div className={style.middleWrapper}>
        <NavLink
          to={`/upcoming/market/${gameId}`}
          className={style.middle}
          onClick={handleMarketCountClick}
        >
          <span className={style.timeText}>
            {isLive ? (
              <T {...dm('Live')} />
            ) : (
              `${month}/${day} ${hours}:${minute}`
            )}
          </span>
          <SportIcon
            sportId={sportId}
            className={style.sportIcon}
            type="light"
          />
          <span className={style.marketCountText}>
            <T {...dm('Quiz')} />
            {` +${count}`}
          </span>
        </NavLink>
      </div>
      <div className={style.right}>
        <div className={style.section}>
          <div className={style.teamIconBg}>
            <TeamIcon
              className={style.teamIcon}
              teamId={team2Id}
              teamName={team2Name}
            />
          </div>
        </div>
        <div className={style.section}>
          <div className={style.teamNameTextWrapper}>
            <span>{team2Name}</span>
          </div>
          <OddsC
            marketId={marketId}
            className={style.oddsBtn}
            imgType="2right"
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
      </div>
    </div>
  );
};

export default TeamMatchBanner;
