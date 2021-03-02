import React, { useEffect, useState, useRef } from 'react';
import { FormattedMessage as T } from 'react-intl';
import { dm } from 'helpers/language';
import arrowTag from 'images/icon_news_arrows.png';
import classNames from 'classnames';
import ReactResizeDetector from 'react-resize-detector';
import style from './News.scss';

const News = ({ entity, openModal, length }) => {
  const [visible, setVisible] = useState(false);
  const [currentIndex, setIndex] = useState(0);
  const [run, setRun] = useState(false);
  const wordsDOM = useRef(null);
  const contentDOM = useRef(null);
  let Content = '';
  if (length > 0) {
    ({ Content } = entity[currentIndex]);
  }
  const animationTime = Math.ceil(Content.length / 3);
  const pollingTime = animationTime * 1;

  useEffect(() => {
    const pollingTimer = setTimeout(() => {
      // reset run marqee
      setRun('');
      setIndex(preState => {
        if (preState + 1 > length - 1) {
          return 0;
        }
        return preState + 1;
      });
    }, pollingTime * 1000);
    return () => {
      clearTimeout(pollingTimer);
    };
  }, [currentIndex]);

  useEffect(() => {
    if (
      length > 0 &&
      wordsDOM.current.clientWidth > contentDOM.current.clientWidth
    ) {
      setRun(true);
    } else {
      setRun(false);
    }
  }, [visible]);

  const handleDetailBtnClick = () => {
    openModal('news');
  };

  const onResize = width => {
    if (wordsDOM.current.clientWidth > width) {
      setRun(true);
    } else {
      setRun(false);
    }
  };

  useEffect(() => {
    // when component change index visible.
    if (run === '') setVisible(false);
    else setVisible(true);
  }, [run]);

  return (
    <div className={style.container}>
      <img className={style.titleTag} src={arrowTag} alt="new tag" />
      <span className={style.title}>
        <T {...dm('News')} />:
      </span>
      {length !== 0 && (
        <div ref={contentDOM} className={style.content}>
          <ReactResizeDetector handleWidth onResize={onResize} />
          <div
            ref={wordsDOM}
            style={{
              animationDuration: `${animationTime}s`,
            }}
            className={classNames(run && style.run)}
          >
            {visible ? entity[currentIndex].Content : ''}
          </div>
        </div>
      )}
      <div
        aria-hidden
        className={style.detailBtn}
        onClick={handleDetailBtnClick}
      />
    </div>
  );
};

export default News;
