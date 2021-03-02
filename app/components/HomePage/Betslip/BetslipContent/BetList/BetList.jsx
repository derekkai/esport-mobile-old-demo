import React, { useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import BetCardC from './BetCard/BetCard.C';
import style from './BetList.scss';

const BetList = ({ keys, removeBetEntity, setBetType, modal }) => {
  const handleItemOnExited = el => () => {
    if (keys.length <= 1) {
      setBetType('single');
    }
    setTimeout(() => {
      removeBetEntity(el);
    }, 300);
  };

  useEffect(() => {
    if (modal === 'betslip') document.body.style.overflow = 'hidden';
    else if (modal === '') {
      document.body.style.overflow = 'auto';
    }
  }, [modal]);

  return (
    <TransitionGroup component="ul" className={style.list}>
      {keys.map(el => (
        <CSSTransition
          timeout={600}
          classNames="fade"
          key={el}
          onExited={handleItemOnExited(el)}
        >
          <li className={style.item}>
            <BetCardC eventId={el} />
          </li>
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
};

export default BetList;
