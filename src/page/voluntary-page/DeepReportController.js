import React from 'react';
// 关于数据模块交互
import { connect } from 'react-redux';

import '../../style/home-voluntary.css';

import { BaseHeader } from './component/VoluntaryHeader';
import ResultDeepController from '../home/voluntary/result/result-deep-analysis-controller';

import { Divider } from 'antd';
import { launchRequest } from '../../util/request';
import * as APIS from '../../constants/api-constants';
import { actions as voluntaryActions } from '../../redux/voluntary-model';
import { PreviousStep } from './component/PreviousStep';
import { BackgroundImage } from './component/BackgroundImage';

class DeepReportController extends React.Component {
  render() {
    return (
      <div className='home-voluntary-box'>

        <h1>55555555555-2</h1>
        <BaseHeader/>

        <div className='home-voluntary-content'>
          <div className='voluntary-main-box'>
            <Divider>结果</Divider>
            <div className='steps-content'>
              <ResultDeepController/>
            </div>
            <PreviousStep {...this.props}/>
          </div>
        </div>
        <BackgroundImage/>

      </div>
    );
  }


  // 刷新页面时，先拿到暂存的志愿表信息

  // 得再这里取值 坑b
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (JSON.stringify(prevProps.user) !== JSON.stringify(this.props.user)) {
      console.log(this.props.user.uuid, 99999999);
      // saveMyVoluntary
      const data = await launchRequest(APIS.GET_TEMP_VOLUNTARY, {
        uuid: this.props.user
      });
      this.props.recordVoluntaryDetail(data[this.props.match.params.lotId]);

      // 提交到后台后返回uuid
      let voluntaryId = await launchRequest(APIS.SAVE_VOLUNTARY, {
        lotId: +this.props.match.params.lotId,
        voluntary: data[this.props.match.params.lotId],
        reportType: 2
      });

      // await this.props.getUser();

      if (voluntaryId) {
        // 将uuid存入redux
        this.props.recordVoluntaryResultType('deepReport');
        this.props.recordVoluntaryListOption(voluntaryId);
        this.props.recordVoluntaryDeepUuid(voluntaryId);

      }
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
    recordVoluntaryListOption: params => {
      dispatch(voluntaryActions.recordVoluntaryListOption(params));
    },
    recordVoluntaryDeepUuid: params => {
      dispatch(voluntaryActions.recordVoluntaryDeepUuid(params));
    },
    recordVoluntaryResultType: type => {
      dispatch(voluntaryActions.recordVoluntaryResultType(type));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeepReportController);