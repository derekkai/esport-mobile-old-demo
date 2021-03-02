import React from 'react';
import Loading from 'components/ShareComponent/Loading/Loading';
import { FormattedMessage as T } from 'react-intl';
import { dm } from 'helpers/language';
import Market from './Market/Market';
import style from './MarketList.scss';

const MarketList = ({ data, loading }) => {
  return (
    <div className={style.container}>
      {loading ? (
        <div className={style.loadingWrapper}>
          <Loading />
        </div>
      ) : (
        <div className={style.contentWrapper}>
          {data.length === 0 ? (
            <div className={style.emptyText}>
              <T {...dm('There is no market currently.')} />
            </div>
          ) : (
            <ul className={style.list}>
              {data.map(value => (
                <Market
                  key={`${value.market_type}${value.name}`}
                  name={value.name}
                  marketType={value.market_type}
                  markets={value.markets}
                />
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default MarketList;
