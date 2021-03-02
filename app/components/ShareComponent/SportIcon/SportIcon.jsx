import React, { useState, useEffect } from 'react';
import settings from 'settings';

const SportIcon = ({ sportId, className, type = 'deep' }) => {
  const [src, setSrc] = useState(null);
  let sportAlias;

  useEffect(() => {
    getImage();
  }, [type]);

  const getImage = async () => {
    if (
      sportId &&
      typeof sportId === 'number' &&
      settings.sportIds.includes(sportId)
    ) {
      sportAlias = settings.sportIdMap[sportId].alias;
      await import(`images/logo-${type}/icon_${sportAlias}.png`).then(image => {
        setSrc(image.default);
      });
    } else {
      await import(`images/logo-${type}/icon_${sportId}.png`).then(image => {
        setSrc(image.default);
      });
    }
  };

  return <img className={className} src={src} alt={sportAlias} />;
};

export default SportIcon;
