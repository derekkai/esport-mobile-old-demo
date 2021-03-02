import React, { useRef, useEffect, useState } from 'react';
import classNames from 'classnames';
import { unsubscribeHandler } from 'Sagas/websocket';
import DropDown from 'components/ShareComponent/DropDown/DropDown';
import settings from 'settings';
import style from './BetslipContent.scss';
import BetList from './BetList/BetList.C';
import SingleFooterC from './SingleFooter/SingleFooter.C';
import SystemFooterC from './SystemFooter/SystemFooter.C';

const BetslipContent = ({
  betType,
  oddsFormat,
  setBetType,
  setOddsFormat,
  clearBetslipData,
  keys,
  removeBetsKey,
}) => {
  const contentEl = useRef(null);
  const [disableItem, setDisableItem] = useState([]);
  const handleBetTypeChange = value => {
    setBetType(value);
  };

  const handleOddsFormatChange = value => {
    setOddsFormat(value);
  };

  const handleClearBtnClick = () => {
    if (keys.length > 0) {
      contentEl.current.scrollTop = 0;
      for (let i = keys.length - 1; i >= 0; i -= 1) {
        setTimeout(() => {
          removeBetsKey(keys[i]);
        }, 100 * (keys.length - i));
      }
      clearBetslipData();
      unsubscribeHandler('betslip');
    }
  };

  useEffect(() => {
    let temp = [];
    if (keys.length < 2) {
      temp = ['system', 'multiple'];
    } else if (keys.length < 3) {
      temp = ['system'];
    }
    setDisableItem(temp);
  }, [keys]);

  return (
    <React.Fragment>
      <div className={style.toolbar}>
        <div className={style.drops}>
          <DropDown
            className={style.betTypeSelect}
            options={settings.betTypes}
            value={betType}
            onChange={handleBetTypeChange}
            disableItem={disableItem}
          />
          <DropDown
            className={style.oddsformatSelect}
            options={settings.oddsFormat}
            value={oddsFormat}
            onChange={handleOddsFormatChange}
          />
        </div>
        <button
          type="button"
          className={style.clearBtn}
          onClick={handleClearBtnClick}
        />
      </div>
      <div
        ref={contentEl}
        className={classNames(
          style.content,
          betType !== 'single' && style.reduce,
        )}
      >
        <BetList />
      </div>
      {betType === 'single' ? <SingleFooterC /> : <SystemFooterC />}
    </React.Fragment>
  );
};

export default BetslipContent;
