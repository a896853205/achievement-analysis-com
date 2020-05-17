import React from 'react';

import '../../../style/home-voluntary.css';

export const BackgroundImage = () => {

  return (
    <React.Fragment>
      <img
        src='/images/background/background-bottom.png'
        className='left-background-bottom'
        alt='页面下角蓝色图片'
      />
      <img
        src='/images/background/background-bottom.png'
        className='right-background-bottom'
        alt='页面下角蓝色图片'
      />
    </React.Fragment>

  );
};