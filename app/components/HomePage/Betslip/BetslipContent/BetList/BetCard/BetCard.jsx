import React from 'react';
import SingleBetCardC from './SingleBetCard/SingleBetCard.C';
import SystemBetCardC from './SystemBetCard/SystemBetCard.C';

const BetCard = ({ betType, eventId, status }) => {
  if (!status) return null;
  return betType === 'single' && status !== 'close' ? (
    <SingleBetCardC eventId={eventId} />
  ) : (
    <SystemBetCardC eventId={eventId} />
  );
};

export default BetCard;
