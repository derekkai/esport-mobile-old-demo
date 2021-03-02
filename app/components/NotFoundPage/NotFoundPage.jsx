/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 *
 */

import React from 'react';
import style from './NotFoundPage.scss';

export default function NotFound() {
  return <div className={style.notFoundPageBg} />;
}
