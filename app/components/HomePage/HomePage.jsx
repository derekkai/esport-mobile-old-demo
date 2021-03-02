import React, { useEffect, useState, useRef } from 'react';
import Loading from 'components/ShareComponent/Loading/Loading';
import { Switch, Route } from 'react-router-dom';
import BetslipC from './Betslip/Betslip.C';
import MarketPageC from './MarketPage/MarketPage.C';
import MainPage from './MainPage/MainPage';
import BetslipTag from './BetslipTag/BetslipTag.C';
import style from './HomePage.scss';
import ModalsC from './Modals/Modals.C';
import KeyBoardC from './KeyBoard/KeyBoard.C';

const HomePage = ({
  setMainDataViewPoint,
  location,
  initalApp,
  loading,
  setSummaryListType,
  summaryListLoadDown,
  mainDataViewPoint,
  summaryListType,
  requestSummaryListData,
  setSummaryItemRenderCount,
  summaryItemRenderCount,
  needInit,
}) => {
  const [render, setRender] = useState(false);
  const [loadingRender, setLoadingRender] = useState(false);
  const scrollbottomflag = useRef(false);
  const summaryListLoadDownRef = useRef(summaryListLoadDown);
  const mainDataViewPointRef = useRef(mainDataViewPoint);
  const summaryListTypeRef = useRef(summaryListType);
  const summaryItemRenderCountRef = useRef(summaryItemRenderCount);
  let loadingDelay;
  let renderDelay;
  let updateBalanceInteral;

  useEffect(() => {
    summaryItemRenderCountRef.current = summaryItemRenderCount;
  }, [summaryItemRenderCount]);

  useEffect(() => {
    summaryListLoadDownRef.current = summaryListLoadDown;
    mainDataViewPointRef.current = mainDataViewPoint;
    summaryListTypeRef.current = summaryListType;
  }, [summaryListLoadDown, mainDataViewPoint, summaryListType]);

  const scrollbottonEvent = event => {
    const { scrollingElement } = event.target;
    const bottom =
      scrollingElement.scrollHeight -
      scrollingElement.scrollTop -
      scrollingElement.clientHeight;
    if (bottom < 500 && !scrollbottomflag.current) {
      console.log('botton');
      scrollbottomflag.current = true;
      if (
        summaryListLoadDownRef.current &&
        mainDataViewPointRef.current === 'game' &&
        summaryListTypeRef.current === 'result'
      ) {
        requestSummaryListData();
      }
      setSummaryItemRenderCount(summaryItemRenderCountRef.current + 30);
    } else if (bottom > 500 && scrollbottomflag.current) {
      console.log('leave botton');
      scrollbottomflag.current = false;
    }
  };

  useEffect(() => {
    if (needInit) {
      initalApp();
    }
    window.addEventListener('scroll', scrollbottonEvent);
    return () => {
      window.removeEventListener('scroll', scrollbottonEvent);
      clearInterval(updateBalanceInteral);
      updateBalanceInteral = undefined;
      clearTimeout(loadingDelay);
      clearTimeout(renderDelay);
      loadingDelay = undefined;
      renderDelay = undefined;
    };
  }, []);

  useEffect(() => {
    if (loading) {
      loadingDelay = setTimeout(() => {
        setLoadingRender(true);
      }, 500);
    }
    if (!loading) {
      renderDelay = setTimeout(() => {
        setLoadingRender(false);
        setRender(true);
      }, 2000);
    }
  }, [loading]);

  useEffect(() => {
    const { pathname } = location;
    const paths = pathname.split('/');
    const [, SummaryListType, viewPoint] = paths;
    if (viewPoint === 'market') {
      setMainDataViewPoint('market');
    } else {
      setMainDataViewPoint('game');
    }
    switch (SummaryListType) {
      case '':
      case 'upcoming':
        setSummaryListType('upcoming');
        break;
      case 'result':
        setSummaryListType('result');
        break;
      case 'champion':
        setSummaryListType('champion');
        break;
      default:
        break;
    }
  }, [location]);

  return (
    <React.Fragment>
      {loadingRender && (
        <div className={style.loadingWrapper}>
          <Loading />
        </div>
      )}
      {render && (
        <React.Fragment>
          <Switch>
            <Route path="/:type/market/:id" component={MarketPageC} />
            <Route path="" component={MainPage} />
          </Switch>
          <ModalsC />
          <BetslipC />
          <BetslipTag />
          <KeyBoardC />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

HomePage.propTypes = {};

export default HomePage;
