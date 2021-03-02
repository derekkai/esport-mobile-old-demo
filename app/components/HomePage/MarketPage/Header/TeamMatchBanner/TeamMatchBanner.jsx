import React from 'react';
import TeamIcon from 'components/ShareComponent/TeamIcon/TeamIcon';
import SportIcon from 'components/ShareComponent/SportIcon/SportIcon';
import { timeConvert } from 'helpers/common';
import style from './TeamMatchBanner.scss';

const TeamMatchBanner = ({
  haveVideo,
  team1Name,
  team2Name,
  team1Id,
  team2Id,
  isLive,
  time,
  sportId,
  finalScore,
  setVideoOpen,
}) => {
  const { hours, day, minute, month } = timeConvert(time);
  let team1Score;
  let team2Score;
  if (isLive) {
    if (finalScore === '') {
      team1Score = 0;
      team2Score = 0;
    } else {
      [team1Score, team2Score] = finalScore
        .replace(/\s/gi, '')
        .split(',')[0]
        .split(':');
    }
  }

  const handleVideoOpenBtnClick = () => {
    if (haveVideo) setVideoOpen(true);
  };

  return (
    <div className={style.container}>
      <div className={style.left}>
        <div className={style.section}>
          <div className={style.teamIconBg}>
            <TeamIcon
              className={style.teamIcon}
              teamId={team1Id}
              teamName={team1Name}
            />
          </div>
        </div>
        <div className={style.section}>
          <span className={style.teamNameText}>{team1Name}</span>
        </div>
      </div>
      <div className={style.middleWrapper}>
        <div className={style.middle}>
          {haveVideo ? (
            <span
              className={style.timeText}
            >{`${hours}:${minute} 直播中`}</span>
          ) : (
            <span className={style.timeText}>
              {isLive
                ? `${month}/${day} ${hours}:${minute}`
                : `${month}/${day}`}
            </span>
          )}
          <SportIcon
            className={style.sportIcon}
            sportId={sportId}
            type="light"
          />
          <div
            aria-hidden
            className={style.liveBtnContainer}
            onClick={handleVideoOpenBtnClick}
          >
            {isLive ? (
              <span
                className={style.scoreText}
              >{`${team1Score} : ${team2Score}`}</span>
            ) : (
              <span className={style.timeText}>{`${hours}:${minute}`}</span>
            )}
            {haveVideo && <div className={style.videoArrowBtn} />}
          </div>
        </div>
      </div>
      <div className={style.right}>
        <div className={style.section}>
          <span className={style.teamNameText}>{team2Name}</span>
        </div>
        <div className={style.section}>
          <div className={style.teamIconBg}>
            <TeamIcon
              className={style.teamIcon}
              teamId={team2Id}
              teamName={team2Name}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamMatchBanner;
