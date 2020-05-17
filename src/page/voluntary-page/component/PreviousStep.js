import React from 'react';

import '../../../style/home-voluntary.css';

import {  Button } from 'antd';

export const PreviousStep = (props) => {

  return (
    <div className='voluntarty-button-box'>
      <Button
        size='large'
        className='btn-large'
        onClick={ () => props.history.goBack() }
      >
        上一步
      </Button>
    </div>
  );
};