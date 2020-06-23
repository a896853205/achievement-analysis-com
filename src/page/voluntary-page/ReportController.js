import React from 'react';
// 关于数据模块交互
import { connect } from 'react-redux';

import '../../style/home-voluntary.css';

import { BaseHeader } from './component/VoluntaryHeader';
import ResultReportController from '../home/voluntary/result/result-report-controller';
import { Divider } from 'antd';
import { launchRequest } from '../../util/request';
import * as APIS from '../../constants/api-constants';
import { actions as voluntaryActions } from '../../redux/voluntary-model';
import { PreviousStep } from './component/PreviousStep';
import { BackgroundImage } from './component/BackgroundImage';

class ReportController extends React.Component {
  render() {
    return (
      <div className='home-voluntary-box'>

        <BaseHeader/>

        <div className='home-voluntary-content'>
          <div className='voluntary-main-box'>
            <Divider>结果</Divider>
            <div className='steps-content'>
              <ResultReportController {...this.props} />
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
      // saveMyVoluntary
      const data = await launchRequest(APIS.GET_TEMP_VOLUNTARY, {
        uuid: this.props.user
      });
      this.props.recordVoluntaryDetail(data[this.props.match.params.lotId]);

        // 将uuid存入redux
        this.props.recordVoluntaryResultType('report');
        this.props.recordVoluntaryIdGetResult(this.props.match.params.voluntaryId);

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
    recordVoluntaryIdGetResult: params => {
      dispatch(voluntaryActions.recordVoluntaryIdGetResult(params));
    },
    recordVoluntaryResultType: type => {
      dispatch(voluntaryActions.recordVoluntaryResultType(type));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReportController);