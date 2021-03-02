import React from 'react';
import settings from 'settings';
import style from './EventGroup.scss';
import EventC from './Event/Event.C';

const EventGroup = ({
  name,
  events,
  marketId,
  isFirstGroup,
  result,
  isVSFormat,
  setIsWithTitle,
}) => {
  const displayCancelTag =
    result === settings.eventResultOfGameCancel ||
    result === settings.eventResultOfMarketCancel;
  const renderLeftEvent = () => {
    const children = [];
    for (let i = 0; i < events.length; i += 2) {
      children.push(
        <EventC
          setIsWithTitle={setIsWithTitle}
          key={events[i]}
          hideName={isVSFormat}
          isFirstGroup={isFirstGroup}
          marketName={name}
          marketId={marketId}
          eventId={events[i]}
        />,
      );
    }
    return children;
  };

  const renderRightEvent = () => {
    const children = [];
    for (let i = 1; i < events.length; i += 2) {
      children.push(
        <EventC
          key={events[i]}
          right
          isFirstGroup={isFirstGroup}
          hideName={isVSFormat}
          marketName={name}
          marketId={marketId}
          eventId={events[i]}
        />,
      );
    }
    return children;
  };

  return (
    events.length > 0 && (
      <div className={style.container}>
        {displayCancelTag && <span className={style.cancelTag}>已取消</span>}
        <ul className={style.leftArea}>{renderLeftEvent()}</ul>
        <ul className={style.rightArea}>{renderRightEvent()}</ul>
      </div>
    )
  );
};

export default EventGroup;
