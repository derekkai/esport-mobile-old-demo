/* eslint-disable react/prop-types */
import React from 'react';
import { CSSTransition } from 'react-transition-group';
import Loading from 'components/ShareComponent/Loading/Loading';
import style from './style.scss';

export function withListLoading(WrappedComponent) {
  return props =>
    props.loading ? (
      <div className={style.loadingWrapper}>
        <Loading />
      </div>
    ) : (
      <WrappedComponent {...props} />
    );
}

const withModalFade = WrappedComponent => id => props => (
  <CSSTransition
    in={props.modal === id}
    timeout={400}
    appear
    unmountOnExit
    classNames="modal"
  >
    <WrappedComponent {...props} />
  </CSSTransition>
);

export { withModalFade };
