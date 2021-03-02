import React, { useState } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import settings from 'settings';
import style from './TeamIcon.scss';

const TeamIcon = ({ className, teamId, teamName, size = 'medium' }) => {
  const [useDefault, setDefault] = useState(false);
  const [imgOnLoad, setImgOnLoad] = useState(false);
  const teamIconUrl = `${settings.teamIconCdnUrl}${Math.floor(
    teamId / 2000,
  )}/${teamId}.png`;
  //////////Team Icon miss report//////////
  const url = `http://dev-api.fastbet518.com/api/ESPMember/SetSquadron/${teamId}`;

  const handleSendLog = () => {
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    }).catch(err => {
      console.log('錯誤:', err);
    });
  };

  const getTeamNameFirstWord = () => {
    if (teamName) {
      for (let i = 0; i < teamName.length; i += 1) {
        const char = teamName.charAt(i);
        if (char !== ' ') {
          return char;
        }
      }
    }
    return undefined;
  };

  //////////Team Icon miss report//////////
  return useDefault ? (
    <div className={classNames(className, style.defaultIcon, style[size])}>
      <span>{getTeamNameFirstWord()}</span>
    </div>
  ) : (
    <img
      role={teamId}
      className={classNames(
        className,
        style.icon,
        style[size],
        imgOnLoad && style.visible,
      )}
      src={teamIconUrl}
      onError={e => {
        setDefault(true);
        handleSendLog();
        e.target.onerror = null;
      }}
      onLoad={() => {
        setImgOnLoad(true);
      }}
      alt={teamName}
    />
  );
};

TeamIcon.propTypes = {
  teamId: PropTypes.number.isRequired,
  teamName: PropTypes.string.isRequired,
};

export default TeamIcon;
