import React, { useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import DropDown from 'components/ShareComponent/DropDown/DropDown';
import { FormattedMessage as T } from 'react-intl';
import settings from 'settings';
import { dm } from 'helpers/language';
import SmartButton from 'components/ShareComponent/SmartButton/SmartButton';
import style from './SystemFooter.scss';
const SystemFooter = ({
  betType,
  count,
  price,
  stake,
  updateStake,
  setKeyBoardHandleFunc,
  openKeyBoard,
  setSystemNum,
  systemNumSelectItem,
  setSystemBetCount,
  systemNum,
}) => {
  const potentialWin = (price * stake).toFixed(2);

  const handleStakeInputClick = () => {
    openKeyBoard(true);
    setKeyBoardHandleFunc(param => {
      updateStake(Number(param));
    });
  };

  const handleSystemNumChange = value => {
    setSystemNum(Number(value));
  };

  useEffect(() => {
    setSystemBetCount(count);
  }, [count]);

  const totalCost = count * stake;
  return (
    <React.Fragment>
      <CSSTransition
        in={betType === 'system' && systemNumSelectItem.length !== 0}
        timeout={600}
        classNames="betslip-footer"
        unmountOnExit
      >
        <div className={style.systemContainer}>
          <DropDown
            directionReverse
            className={style.combinNum}
            options={systemNumSelectItem}
            onChange={handleSystemNumChange}
            value={systemNum}
          />
          <div>
            <span className={style.text}>
              <T {...dm('Combinations')} />
              {`: ${count}`}
            </span>
            <span className={style.text}>
              <T {...dm('Total')} />
              {`: ${totalCost}¥`}
            </span>
          </div>
        </div>
      </CSSTransition>
      <div className={style.container}>
        <div className={style.topSection}>
          <div>
            <span className={style.oddsText}>
              <T {...dm('Odds')} />
            </span>
          </div>
          <span className={style.text}>
            <T {...dm('Potential Win')} />
            {`: ${potentialWin}¥`}
          </span>
        </div>
        <div className={style.bottomSection}>
          <div>
            <SmartButton
              className={style.oddsBtn}
              img="7"
              type="normal"
              text={price.toFixed(settings.priceDecimalPlaceDisplay)}
              isTag
            />
          </div>
          <div
            aria-hidden
            className={style.input}
            onClick={handleStakeInputClick}
          >
            <div>{stake === '' ? <T {...dm('Stake')} /> : stake}</div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SystemFooter;
