import React from 'react';

// 关于数据模块交互
import { connect } from 'react-redux';

import { Divider } from 'antd';

import { BaseHeader } from './component/VoluntaryHeader';
import Step4 from '../home/voluntary/step4-controller';

import '../../style/home-voluntary.css';

// 请求文件
import * as APIS from '../../constants/api-constants';
import { launchRequest } from '../../util/request';
import { actions as voluntaryActions } from '../../redux/voluntary-model';
import { BackgroundImage } from './component/BackgroundImage';
import { PreviousStep } from './component/PreviousStep';

class VoluntaryDetail extends React.Component {
  render() {
    return (
      <div className='home-voluntary-box'>

        <BaseHeader/>

        <div className='home-voluntary-content'>
          <div className='voluntary-main-box'>
            <Divider>确认志愿表</Divider>
            <div className='steps-content'>
              <Step4 {...this.props}/>
            </div>

            <PreviousStep {...this.props}/>

          </div>
        </div>

        <BackgroundImage/>

      </div>
    );

  }

  // 刷新页面时，先拿到暂存的志愿表信息

  // 得再这里取值 坑死了，咱也不知道为什么
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if(JSON.stringify(prevProps.user) !== JSON.stringify(this.props.user)){
      // saveMyVoluntary
      const data = await launchRequest(APIS.GET_TEMP_VOLUNTARY, {
        uuid: this.props.user
      });
      this.props.recordVoluntaryDetail(data[this.props.match.params.lotId]);
    }
  }

  async componentDidMount() {
    this.props.setLotId(+this.props.match.params.lotId);
  }
}

// 从store接收state数据
const mapStateToProps = store => {
  const { user } = store['userStore'];
  return {
    user
  };
};

// 向store dispatch action
const mapDispatchToProps = dispatch => {
  return {
    recordVoluntaryDetail: params => {
      dispatch(voluntaryActions.recordVoluntaryDetail(params));
    },
    setLotId: (lotId) => {
      dispatch(voluntaryActions.setLotId(lotId));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VoluntaryDetail);