import React from 'react';
import classNames from 'classnames';
import { FormattedMessage as T } from 'react-intl';
import { dm } from 'helpers/language';
import style from './DropDown.scss';

const DropDown = ({
  options,
  value,
  onChange,
  className,
  directionReverse = false,
  disableItem = [],
}) => {
  const handleSelectChange = e => {
    onChange(e.target.value);
  };

  return (
    <div
      className={classNames(
        style.container,
        className,
        directionReverse && style.reverse,
      )}
    >
      <select
        className={style.select}
        onChange={handleSelectChange}
        value={value}
      >
        {options.map(el => (
          <T key={el.label} {...dm(el.label)} values={el.labelValues}>
            {message => (
              <option
                disabled={disableItem.includes(el.value)}
                value={el.value}
              >
                {message}
              </option>
            )}
          </T>
        ))}
      </select>
    </div>
  );
};

export default DropDown;
