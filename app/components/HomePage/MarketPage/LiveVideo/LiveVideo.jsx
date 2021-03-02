import React from 'react';
import classNames from 'classnames';
import TeamIcon from 'components/ShareComponent/TeamIcon/TeamIcon';
import style from './LiveVideo.scss';

const LiveVideo = ({
  videoUrl,
  setVideoOpen,
  isVideoOpen,
  team1Name,
  team2Name,
  team1Id,
  team2Id,
}) => {
  const handleCloseVideoBtnClick = () => {
    setVideoOpen(false);
  };

  return (
    <React.Fragment>
      <div
        className={classNames(style.videoWrapper, isVideoOpen && style.open)}
      >
        <div
          className={classNames(style.videoHeader, isVideoOpen && style.show)}
        >
          <div
            aria-hidden
            className={style.goBackArrowBtn}
            onClick={handleCloseVideoBtnClick}
          />
          <div className={style.titleWrapper}>
            <div className={style.title}>
              <div className={style.teamIconBg}>
                <TeamIcon
                  className={style.teamIcon}
                  teamId={team1Id}
                  teamName={team1Name}
                />
              </div>
              <span className={style.teamNameText}>{team1Name}</span>
              <span className={style.vsText}>VS</span>
              <span className={style.teamNameText}>{team2Name}</span>
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
        <iframe
          className={style.video}
          title="live"
          frameBorder="0"
          scrolling="no"
          allowFullScreen
          src={`${videoUrl}&layout=video&!autoplay&playsinline&muted`}
        />
      </div>
    </React.Fragment>
  );
};

export default LiveVideo;
