import React from 'react';

// 关于数据模块交互
import { connect } from 'react-redux';

// UI组件
import { Skeleton, Tag } from 'antd';
import ReactEcharts from 'echarts-for-react';
import '@/style/voluntary/result.css';

import ResultVoluntaryDetailController from '../../../home/voluntary/result/result-voluntary-detail-controller';
import { readUrlParams } from '@/util/parseUrlParams';
import VoluntaryDetailController from '../../../../page/home/voluntary/step4/voluntary-detail-controller';
import { actions as voluntaryActions } from '../../../../redux/voluntary-model';

// 请求文件
import { launchRequest } from '../../../../util/request';
import * as APIS from '../../../../constants/api-constants';
import * as DominConfigs from '../../../../constants/domin-constants';

class ResultReportController extends React.Component {
  state = {
    receiveLotId: ''
  };
  getOption = result => {
    const option = {
      xAxis: {
        type: 'category',
        data: ['志愿A', '志愿B', '志愿C', '志愿D', '志愿E']
      },
      yAxis: {
        type: 'value',
        max: Math.max(...result),
        min: Math.min(...result)
      },
      series: [
        {
          data: [],
          type: 'line'
        }
      ]
    };

    option.series[0].data = result;

    return option;
  };

  // 二批A 10个志愿
  getOption2 = result => {
    const option = {
      xAxis: {
        type: 'category',
        data: ['志愿A', '志愿B', '志愿C', '志愿D', '志愿E', '志愿F', '志愿G', '志愿H', '志愿I', '志愿J']
      },
      yAxis: {
        type: 'value',
        max: Math.max(...result),
        min: Math.min(...result)
      },
      series: [
        {
          data: [],
          type: 'line'
        }
      ]
    };

    option.series[0].data = result;

    return option;
  };
  render() {
    return (
      <div className='voluntary-result-content'>
        <h1>志愿分析评测报告</h1>
        <div className="voluntary-result-mgb20">
          名称: 志愿分析评测报告 批次：
          {this.props.voluntaryResult.lotsName}
        </div>

        {readUrlParams('from') ? (
          <ResultVoluntaryDetailController
            schoolAndMajorUuid={readUrlParams('from')}
          />
        ) : (<VoluntaryDetailController/>)}


        <div className='voluntary-result-detail-box'>
          {this.props.voluntaryResult.completeResult ? (
            <div className='voluntary-result-title-box'>
              <h3
                className={`voluntary-result-title ${
                  this.props.voluntaryResult.completeResult.reasonable
                    ? 'voluntary-result-title-success'
                    : 'voluntary-result-title-error'
                }`}
              >
                志愿选择完备性
              </h3>
              <div className='voluntary-result-describe-box'>
                {this.props.voluntaryResult.completeResult.reasonable ? (
                  <Tag color='#87d068'>合理</Tag>
                ) : (
                  <Tag color='#f50'>不合理</Tag>
                )}
                <p>{this.props.voluntaryResult.completeResult.describe}</p>
                <p>智赢建议：不要放弃任何一个机会。</p>
                <p>
                  {this.props.voluntaryResult.completeResult.unWriteDetailArr.map(
                    item => (
                      <span key={item}>{item}</span>
                    )
                  )}
                </p>
              </div>
            </div>
          ) : (
            <Skeleton/>
          )}
          {this.props.voluntaryResult.gradedResult ? (
            <div className='voluntary-result-title-box'>
              <h3
                className={`voluntary-result-title ${
                  this.props.voluntaryResult.gradedResult.reasonable
                    ? 'voluntary-result-title-success'
                    : 'voluntary-result-title-error'
                }`}
              >
                梯度选择合理性
              </h3>
              <div className='voluntary-result-describe-box'>
                {this.props.voluntaryResult.gradedResult.reasonable ? (
                  <Tag color='#87d068'>合理</Tag>
                ) : (
                  <Tag color='#f50'>不合理</Tag>
                )}
                <p>{this.props.voluntaryResult.gradedResult.describe}</p>
                <p>
                  智赢建议：填报志愿应拉开一定的层次，建议按照院校录取不同集合由高到低顺序选择。高风险、中风险、低风险和最佳匹配各个类别集合志愿不能倒置。
                </p>
                <p>
                  {this.props.voluntaryResult.gradedResult.gradedDetailArr.map(
                    item => (
                      <span key={item}>{item}</span>
                    )
                  )}
                </p>
                {+this.props.match.params.lotId === 4 || this.state.receiveLotId === 4 ?
                  <ReactEcharts
                    option={this.getOption2(
                      this.props.voluntaryResult.gradedResult.schoolScoreArr
                    )}
                    style={{ height: '350px' }}
                    className='questionnaire-chart'
                  /> :
                  <ReactEcharts
                    option={this.getOption(
                      this.props.voluntaryResult.gradedResult.schoolScoreArr
                    )}
                    style={{ height: '350px' }}
                    className='questionnaire-chart'
                  />
                }
              </div>
            </div>
          ) : (
            <Skeleton/>
          )}
          {this.props.voluntaryResult.planResult ? (
            <div className='voluntary-result-title-box'>
              <h3
                className={`voluntary-result-title ${
                  this.props.voluntaryResult.planResult.reasonable
                    ? 'voluntary-result-title-success'
                    : 'voluntary-result-title-error'
                }`}
              >
                大计划选择合理性
              </h3>
              <div className='voluntary-result-describe-box'>
                {this.props.voluntaryResult.planResult.reasonable ? (
                  <Tag color='#87d068'>合理</Tag>
                ) : (
                  <Tag color='#f50'>不合理</Tag>
                )}
                <p>{this.props.voluntaryResult.planResult.describe}</p>
                <p>
                  {this.props.voluntaryResult.planResult.planDetailArr.map(
                    item => (
                      <span key={item}>{item}</span>
                    )
                  )}
                </p>
              </div>
            </div>
          ) : (
            <Skeleton/>
          )}
        </div>
      </div>
    );
  }

  componentDidMount =  async ()=>{

    if (readUrlParams('from')) {
      this.props.recordVoluntaryIdGetResult(readUrlParams('from'));

      const receiveLotId = await launchRequest(APIS.GET_LOTID_BY_VOLUNTARY_UUID, { voluntaryUuid: readUrlParams('from') }, DominConfigs.REQUEST_TYPE.GET);
      console.log(receiveLotId, 8888888888);
      this.setState({ receiveLotId});
      console.log(this.state.receiveLotId, 2222222222);
    }
    console.log(this.props.voluntaryResult, +this.props.match.params.lotId, 1111111);
  };
}

// 从store接收state数据
const mapStateToProps = store => {
  const voluntaryStore = store['voluntaryStore'];
  let { voluntaryResult, schoolAndMajorUuid } = voluntaryStore;

  return {
    voluntaryResult,
    schoolAndMajorUuid
  };
};

// 向store dispatch action
const mapDispatchToProps = dispatch => {
  return {
    recordVoluntaryIdGetResult: params => {
      dispatch(voluntaryActions.recordVoluntaryIdGetResult(params));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResultReportController);
