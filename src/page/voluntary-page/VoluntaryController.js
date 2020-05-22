import React from 'react';
import { Divider } from 'antd';

import '../../style/home-voluntary.css';

import Step2 from '../home/voluntary/step2-controller';

// 关于数据模块交互
import { BaseHeader } from './component/VoluntaryHeader';
import { BackgroundImage } from './component/BackgroundImage';

class VoluntaryController extends React.Component {
  render() {
    return (
      <div className='home-voluntary-box'>

        <BaseHeader/>

        <div className='home-voluntary-content'>
          <div className='voluntary-main-box'>
            <Divider>选择报考批次</Divider>
            <div className='steps-content'>
              <Step2 {...this.props}/>
            </div>
          </div>
        </div>

        <BackgroundImage/>

      </div>
    );
  }
}



export default VoluntaryController;