import React from 'react';
import { FormattedMessage as T } from 'react-intl';
import { getBetslipOnlySystemCount, timeConvert } from 'helpers/common';
import settings from 'settings';
import { dm } from 'helpers/language';
import style from './Detail.scss';
import SubItem from './SubItem/SubItem';

const Detail = ({ closeModal, data }) => {
  const {
    BettingAmount,
    BetID,
    BetTypeName,
    BettingResultAmount,
    TotalPrice,
    Selections,
    BetStateName,
    SystemMinCount,
    BettingDate,
  } = data;
  const handleCloseBtnClick = () => {
    closeModal();
  };
  const { hours, day, minute, month } = timeConvert(BettingDate);
  const date = `${month}/${day} ${hours}:${minute}`;

  const haveResult = BetStateName !== 'Unsettled';
  let potentialWin;
  const earn = BettingResultAmount.toFixed(settings.stakeDecimalPlaceDisplay);

  if (!haveResult && BetTypeName === 'System') {
    const sysCount = getBetslipOnlySystemCount(
      Selections.length,
      SystemMinCount,
    );
    potentialWin = ((BettingAmount / sysCount) * TotalPrice).toFixed(
      settings.stakeDecimalPlaceDisplay,
    );
  } else {
    potentialWin = (BettingAmount * TotalPrice).toFixed(
      settings.stakeDecimalPlaceDisplay,
    );
  }

  return (
    <div className={style.mask}>
      <button
        type="button"
        className={style.closeBtn}
        onClick={handleCloseBtnClick}
      />
      <div className={style.container}>
        <div className={style.header}>
          <span className={style.section}>
            <div>{BetID}</div>
            <div>{date}</div>
          </span>
          <span className={style.title}>
            <T {...dm(BetTypeName)} />
          </span>
          <span>
            <div className={style.resultAmountText}>
              <T {...dm(haveResult ? 'Earn' : 'Potential Win')} />
            </div>
            <div className={style.resultAmountText}>
              {`${haveResult ? earn : potentialWin} ¥`}
            </div>
          </span>
        </div>
        <div className={style.content}>
          <div className={style.topArea}>
            <span>
              <T {...dm('Odds')} />
              {`: ${TotalPrice.toFixed(settings.priceDecimalPlaceDisplay)}`}
            </span>
            <span>
              <T {...dm('Stake')} />
              {`: ${BettingAmount} ¥`}
            </span>
          </div>
          <div className={style.listWrapper}>
            <ul className={style.list}>
              {Selections.map(el => {
                const {
                  SportId,
                  CompetitionName,
                  MatchStartDate,
                  Team1Id,
                  Team1Name,
                  Team2Id,
                  Team2Name,
                  MarketName,
                  SelectionName,
                  Price,
                  BetSelState,
                } = el;
                let displayPrice;
                switch (BetSelState) {
                  case 'Draw':
                  case 'Cancel':
                    displayPrice = 'Cancel';
                    break;
                  default:
                    displayPrice = Price;
                }
                return (
                  <SubItem
                    key={`${Team1Name}${Team2Name}${MatchStartDate}`}
                    betSelState={BetSelState}
                    team1Id={Team1Id}
                    team2Id={Team2Id}
                    team1Name={Team1Name}
                    team2Name={Team2Name}
                    competitionName={CompetitionName}
                    sportId={SportId}
                    matchStartDate={MatchStartDate}
                    marketName={MarketName}
                    selectionName={SelectionName}
                    price={displayPrice}
                  />
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
