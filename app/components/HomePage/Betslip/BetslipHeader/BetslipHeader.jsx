import React, { useState } from 'react';
import { FormattedMessage as T } from 'react-intl';
import { dm } from 'helpers/language';
import settings from 'settings';
import classNames from 'classnames';
import SmartButton from 'components/ShareComponent/SmartButton/SmartButton';
import style from './BetslipHeader.scss';

const BetslipHeader = ({
  betCount,
  priceChangeHandleType,
  setPriceChangeHandleType,
}) => {
  const [openPanel, setOpenPanel] = useState(false);

  const handleSettingBtnClick = () => {
    setOpenPanel(preState => !preState);
  };

  const handlePriceChangeRadioSelect = id => () => {
    setPriceChangeHandleType(id);
  };

  return (
    <React.Fragment>
      <div className={style.container}>
        <div className={style.section}>
          <div className={style.title}>
            <T {...dm('Betslip')} />
          </div>
          <SmartButton
            className={style.betCountTag}
            img="6"
            type="normal"
            text={betCount}
            isTag
          />
        </div>
        <button
          type="button"
          className={style.settingBtn}
          onClick={handleSettingBtnClick}
        />
      </div>
      <div className={classNames(style.panel, openPanel && style.open)}>
        <div>
          <span className={style.panelTitle}>
            <T {...dm('Automatically accept price changes')} />
          </span>
          {settings.betslipPriceChangeRadioGroup.map(el => (
            <div
              key={el.id}
              aria-hidden
              className={style.item}
              onClick={handlePriceChangeRadioSelect(el.id)}
            >
              <div
                className={classNames(
                  style.radio,
                  priceChangeHandleType === el.id && style.selected,
                )}
              />
              <span className={style.label}>
                <T {...dm(el.label)} />
              </span>
            </div>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default BetslipHeader;
