import React from 'react';
import { Divider } from 'antd';

import Step1 from '../home/voluntary/step1-controller';

class CompleteInfoController extends React.Component {
  render() {
    return (
      <div>
        <h1>11111</h1>
        <Divider>填报个人基本信息</Divider>
        <div className='steps-content'>
          <Step1 {...this.props} />
        </div>
      </div>
    );
  }
}

export default CompleteInfoController;