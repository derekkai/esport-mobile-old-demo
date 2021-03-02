import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage as T } from 'react-intl';
import { dm } from 'helpers/language';
import classNames from 'classnames';
import style from './SmartButton.scss';

const SmartButton = React.memo(
  ({ className, img, onClick = () => {}, isTag = false, type, text }) => {
    const imgClass = `img${img}`;
    const typeClass = `${imgClass}-${type}`;
    const handleClick = e => {
      if (type !== 'lock' && !isTag) {
        onClick(e);
        e.stopPropagation();
      }
    };

    const createText = () => {
      if (!text && text !== 0) {
        return '';
      }
      if (!Number.isNaN(Number(text)) || text === '-') {
        return text;
      }
      return <T {...dm(text)} />;
    };

    return (
      <button
        type="button"
        className={classNames(
          className,
          style[imgClass],
          isTag && style.tag,
          style[typeClass],
        )}
        onClick={handleClick}
      >
        {(type !== 'lock' || img === '7') && <div>{createText()}</div>}
      </button>
    );
  },
);

SmartButton.propTypes = {
  img: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  isTag: PropTypes.bool,
  type: PropTypes.string.isRequired,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default SmartButton;
