import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import style from './KeyBoard.scss';

const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
const hotkey = ['0', '00'];

const KeyBord = ({ isKeyBoardOpen, openKeyBoard, keyBoardHandleFunc }) => {
  const [amount, setAmount] = useState('0');
  const handleNumberBtnClick = number => () => {
    if (amount === '0' && number === '00') {
      return;
    }
    if (amount === '0') {
      handleSetAmount(number);
    } else {
      handleSetAmount(`${amount}${number}`);
    }
  };

  const handleBackSpaceBtnClick = () => {
    if (amount.length === 1) {
      handleSetAmount('0');
    } else {
      handleSetAmount(amount.slice(0, amount.length - 1));
    }
  };

  const handleClearBtnClick = () => {
    handleSetAmount('0');
  };

  const handleKeyBoardBlur = () => {
    openKeyBoard(false);
  };

  useEffect(() => {
    if (isKeyBoardOpen) {
      handleSetAmount('0');
    }
  }, [isKeyBoardOpen]);

  const handleDownBtnClick = () => {
    keyBoardHandleFunc(amount);
    openKeyBoard(false);
  };

  const handleSetAmount = param => {
    if (param.length > 7) {
      setAmount(param.substring(0, 7));
    } else {
      setAmount(param);
    }
  };

  return (
    <React.Fragment>
      {isKeyBoardOpen && (
        <div aria-hidden className={style.mask} onClick={handleKeyBoardBlur} />
      )}
      <div
        className={classNames(style.container, isKeyBoardOpen && style.open)}
      >
        <div className={style.section}>
          <div className={style.input}>
            <span>{amount === '0' ? '输入金额' : amount}</span>
          </div>
          <button
            type="button"
            className={style.backspaceBtn}
            onClick={handleBackSpaceBtnClick}
          />
        </div>
        <div className={style.section}>
          {numbers.map(number => (
            <button
              key={number}
              type="button"
              className={style.btn}
              onClick={handleNumberBtnClick(number)}
            >
              <span>{number}</span>
            </button>
          ))}
        </div>
        <div className={style.section}>
          {hotkey.map(number => (
            <button
              key={number}
              type="button"
              className={style.btn}
              onClick={handleNumberBtnClick(number)}
            >
              <span>{number}</span>
            </button>
          ))}
          <button
            type="button"
            className={style.clearBtn}
            onClick={handleClearBtnClick}
          />
          <button
            type="button"
            className={style.downBtn}
            onClick={handleDownBtnClick}
          >
            <span>DONE</span>
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default KeyBord;
