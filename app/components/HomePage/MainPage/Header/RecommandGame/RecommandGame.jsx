import React, { useEffect, useRef } from 'react';
import ReactSwipe from 'react-swipe';
import settings from 'settings';
import TeamMatchBannerC from './TeamMatchBanner/TeamMatchBanner.C';
import style from './RecommandGame.scss';

const RecommandGame = ({ requestRecommandGameData, keys }) => {
  const reactSwipeEl = useRef(null);

  useEffect(() => {
    requestRecommandGameData();
  }, []);

  const handleLeftArrowBtnClick = () => {
    reactSwipeEl.current.prev();
  };
  const handleRightArrowBtnClick = () => {
    reactSwipeEl.current.next();
  };

  return (
    <div className={style.container}>
      <div className={style.swiperBtn}>
        <div
          aria-hidden
          className={style.leftArrowBtn}
          onClick={handleLeftArrowBtnClick}
        />
        <div
          aria-hidden
          className={style.rightArrowBtn}
          onClick={handleRightArrowBtnClick}
        />
      </div>
      <ReactSwipe
        className={style.swiper}
        swipeOptions={{
          continuous: true,
          auto: settings.recommendedEventRoundTime,
        }}
        key={keys.length}
        ref={reactSwipeEl}
      >
        {keys.map(gameId => (
          <div key={gameId}>
            <TeamMatchBannerC gameId={gameId} />
          </div>
        ))}
      </ReactSwipe>
    </div>
  );
};
export default RecommandGame;
