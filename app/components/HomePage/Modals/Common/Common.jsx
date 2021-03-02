import React from 'react';
import { withModalFade } from 'components/HOCs/hocs';
import style from './Common.scss';

const Common = () => {
  return (
    <div className={style.wrapper}>
      <div>
        <div />
      </div>
    </div>
  );
};

export default withModalFade(Common)('common');
