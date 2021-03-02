import React, { useState } from 'react';
import classNames from 'classnames';
import settings from 'settings';
import style from './Market.scss';
import EventGroupC from './EventGroup/EventGroup.C';

const Market = ({ name, markets, marketType }) => {
  const [withTitle, setIsWithTitle] = useState(false);
  const isVSFormat = !settings.nonVersusMarketType.includes(marketType);

  return (
    <li className={style.container}>
      <div>
        <div className={style.marketNameWrapper}>
          <span
            className={classNames(
              style.marketNameText,
              withTitle && style.down,
            )}
          >
            {name}
          </span>
        </div>
        {Object.entries(markets)
          .sort((a, b) => a[0] - b[0])
          .map(([, marketId], key) => (
            <EventGroupC
              isFirstGroup={key === 0}
              key={marketId}
              marketId={marketId}
              name={name}
              marketType={marketType}
              isVSFormat={isVSFormat}
              setIsWithTitle={setIsWithTitle}
            />
          ))}
      </div>
    </li>
  );
};

export default Market;
