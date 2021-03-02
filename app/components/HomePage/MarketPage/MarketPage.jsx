import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import { unsubscribeHandler } from 'Sagas/websocket';
import HeaderC from './Header/Header.C';
import Narbar from './Navbar/Navbar.C';
import LiveVideoC from './LiveVideo/LiveVideo.C';
import MarketListC from './MarketList/MarketList.C';

const MarketPage = ({
  clearMarketResultData,
  clearMarketUpcomingData,
  setMarketGameInfoGameId,
  match,
  requestMarketListData,
  requestMarketGameInfo,
  requestClassifierData,
  loadDown,
  haveVideo,
}) => {
  const [activeTab, setActiveTab] = useState('0');
  const [isVideoOpen, setVideoOpen] = useState(false);
  const [isFixed, setFixed] = useState(false);

  const scrollbottonEvent = event => {
    const top =
      event.target.pageYOffset || event.target.documentElement.scrollTop;
    if (top > 170) {
      setFixed(true);
    } else {
      setFixed(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', scrollbottonEvent);
    return () => window.removeEventListener('scroll', scrollbottonEvent);
  }, []);

  useEffect(() => {
    const { type, id } = match.params;
    requestClassifierData();
    requestMarketGameInfo();
    setMarketGameInfoGameId(id);
    requestMarketListData();
    return () => {
      switch (type) {
        case 'upcoming': {
          clearMarketUpcomingData();
          break;
        }
        case 'result': {
          clearMarketResultData();
          break;
        }
        default:
          break;
      }
      unsubscribeHandler('marketUpcoming');
    };
  }, []);

  return loadDown ? (
    <React.Fragment>
      <HeaderC isVideoOpen={isVideoOpen} setVideoOpen={setVideoOpen} />
      {haveVideo && (
        <LiveVideoC setVideoOpen={setVideoOpen} isVideoOpen={isVideoOpen} />
      )}
      <Narbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isFixed={isFixed}
      />
      <MarketListC id={activeTab} />
    </React.Fragment>
  ) : (
    <div />
  );
};

export default withRouter(MarketPage);
