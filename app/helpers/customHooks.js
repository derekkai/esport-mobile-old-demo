import { useEffect, useRef, useState } from 'react';

export function usePrevious(value) {
  const ref = useRef(value);
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

export function useForceUpdate() {
  const [, set] = useState(true); //boolean state
  return () => set(prevState => !prevState); // toggle the state to force render
}

export function useOddsStatus(price, prePrice, isInBetslip, locked) {
  const oddsStatus = useRef('');
  const isArrowUp = useRef('');
  const forceUpdate = useForceUpdate();
  let clearStatusTimer;
  let clearArrowTimer;
  const setPriceChangeStateTimer = () => {
    clearStatusTimer = setTimeout(() => {
      oddsStatus.current = 'normal';
      forceUpdate();
    }, 5000);
    clearArrowTimer = setTimeout(() => {
      isArrowUp.current = '';
      forceUpdate();
    }, 60000);
  };

  useEffect(
    () => () => {
      clearTimeout(clearStatusTimer);
      clearTimeout(clearArrowTimer);
    },
    [],
  );

  if (price > prePrice && prePrice !== 0) {
    setPriceChangeStateTimer();
    oddsStatus.current = 'up';
    isArrowUp.current = true;
  } else if (price < prePrice) {
    setPriceChangeStateTimer();
    oddsStatus.current = 'down';
    isArrowUp.current = false;
  } else {
    oddsStatus.current = 'normal';
  }
  if (isInBetslip) {
    oddsStatus.current = 'select';
  }
  if (locked || price === 0) {
    oddsStatus.current = 'lock';
    isArrowUp.current = '';
  }

  return [oddsStatus, isArrowUp];
}

export function useInterval(callback, delay) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
    return () => {};
  }, [delay]);
}
