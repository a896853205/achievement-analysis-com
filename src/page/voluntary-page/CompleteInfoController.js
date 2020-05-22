import React from 'react';
import { Divider } from 'antd';

import '../../style/home-voluntary.css';

import Step1 from '../home/voluntary/step1-controller';
import { BackgroundImage } from './component/BackgroundImage';

class CompleteInfoController extends React.Component {
  render() {
    return (
      <div className='home-voluntary-box'>


        <div className='home-voluntary-content'>
          <div className='voluntary-main-box'>
            <Divider>填报个人基本信息</Divider>
            <div className='steps-content'>
              <Step1 {...this.props} />
            </div>
          </div>
        </div>

        <BackgroundImage/>

      </div>
    );
  }
}

export default CompleteInfoController;