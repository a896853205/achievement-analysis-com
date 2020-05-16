import React from 'react';
import { Divider } from 'antd';

import '../../style/home-voluntary.css';

import Step2 from '../home/voluntary/step2-controller';

// 关于数据模块交互
import { BaseHeader } from './component/VoluntaryHeader';

class VoluntaryController extends React.Component {
  render() {
    return (
      <div>
        <h1>22222</h1>
        <BaseHeader/>
        <Divider>选择报考批次</Divider>
        <div className='steps-content'>
          <Step2 {...this.props}/>
        </div>
      </div>
    );
  }
}



export default VoluntaryController;