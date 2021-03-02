import React, { useEffect, useRef } from 'react';
import Lottie from 'react-lottie';
import settings from 'settings';
import { FormattedMessage as T } from 'react-intl';
import { dm } from 'helpers/language';
import classNames from 'classnames';
import style from './Betslip.scss';
import successAnimation from './animation-success.json';
import failAnimation from './animation-fail.json';
import processAnimation from './animation-processing.json';
import BetslipContent from './BetslipContent/BetslipContent.C';
import BetslipFooter from './BetslipFooter/BetslipFooter.C';
import BetslipHeader from './BetslipHeader/BetslipHeader.C';

const Betslip = ({
  isSafariBrowser,
  resetBetslip,
  requestUpdateBetEventData,
  betCount,
  showResult,
  isLogin,
  balance,
  isSuccess,
  isWaitingResponse,
  failCode,
  modal,
  closeModal,
}) => {
  const showResultflag = useRef(false);
  const handleCloseBtnClick = () => {
    closeModal();
  };

  useEffect(() => {
    if (betCount > 0) {
      requestUpdateBetEventData();
    }
  }, []);

  useEffect(() => {
    if (showResult) {
      showResultflag.current = true;
      setTimeout(() => {
        resetBetslip();
      }, 3000);
    } else if (showResultflag.current) {
      if (betCount === 0) {
        showResultflag.current = false;
      }
    }
  }, [showResult]);

  let animationData;
  if (isWaitingResponse) {
    animationData = processAnimation;
  } else {
    animationData = isSuccess ? successAnimation : failAnimation;
  }

  const options = {
    loop: isWaitingResponse,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div
      className={classNames(
        style.container,
        isSafariBrowser && style.ios,
        modal === 'betslip' && style.open,
      )}
    >
      <div className={style.header}>
        {isLogin && (
          <div className={style.balanceText}>
            <span>{`${balance.toFixed(
              settings.balanceDecimalPlaceDisplay,
            )}￥`}</span>
          </div>
        )}
        <div
          aria-hidden
          className={style.closeBtn}
          onClick={handleCloseBtnClick}
        />
      </div>
      <div className={style.main}>
        <BetslipHeader />
        <div className={style.contentContainer}>
          <div>
            {isWaitingResponse && <div className={style.loadingBg} />}
            <div
              className={classNames(
                style.resultBg,
                isSuccess ? style.success : style.fail,
                showResult && style.show,
              )}
            />
          </div>
          {(showResult || isWaitingResponse) && (
            <div className={style.resultIcon}>
              <Lottie options={options} height={100} width={100} speed={1} />
              {isWaitingResponse ? (
                <div className={style.loadingWord}>
                  <T {...dm('Processing...')} />
                </div>
              ) : (
                <div
                  className={classNames(
                    isSuccess ? style.successWord : style.failWord,
                  )}
                >
                  {Object.values(settings.serverCode).includes(failCode) ? (
                    <T {...dm(`ServerCode${failCode}`)} />
                  ) : (
                    <T {...dm('Place Bet Fail!')} />
                  )}
                </div>
              )}
            </div>
          )}
          <BetslipContent />
        </div>
        <div className={style.footer}>
          <BetslipFooter betCount={betCount} />
        </div>
      </div>
    </div>
  );
};

export default Betslip;
