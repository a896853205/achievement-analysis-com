import React from 'react';

// 关于数据模块交互
import { connect } from 'react-redux';

// UI组件
import { Divider, Skeleton, Tag } from 'antd';
import ReactEcharts from 'echarts-for-react';

// css
import '../../../style/voluntary/result.css';

class VoluntaryResultController extends React.Component {
  getOption = result => {
    const option = {
      xAxis: {
        type: 'category',
        data: ['志愿A', '志愿B', '志愿C', '志愿D', '志愿E']
      },
      yAxis: {
        type: 'value',
        max: 750
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
      <div className='voluntary-result-box'>
        <div className='voluntary-result-content'>
          <h1>志愿分析评测报告</h1>
          <Divider />
          <div>
            名称: 志愿分析评测报告 批次: {this.props.voluntaryResult.lotsName}
          </div>
          <div className='voluntary-result-detail-box'>
            <div>
              {this.props.voluntaryResult.completeResult ? (
                <div>
                  <Divider />
                  <h3 className='voluntary-result-title'>
                    <span>志愿选择完备性</span>
                    {this.props.voluntaryResult.completeResult.reasonable ? (
                      <Tag color='#87d068'>合理</Tag>
                    ) : (
                      <Tag color='#f50'>不合理</Tag>
                    )}
                  </h3>
                  <Divider />
                  <h5 className='result-describe'>
                    {this.props.voluntaryResult.completeResult.describe}
                  </h5>
                  {this.props.voluntaryResult.completeResult.unWriteDetailArr.map(
                    item => (
                      <p key={item}>{item}</p>
                    )
                  )}
                </div>
              ) : (
                <Skeleton />
              )}
            </div>
            <div>
              <h3 className='voluntary-result-title'>
                {this.props.voluntaryResult.gradedResult ? (
                  <div>
                    <Divider />
                    <h3 className='voluntary-result-title'>
                      <span>梯度选择合理性</span>
                      {this.props.voluntaryResult.gradedResult.reasonable ? (
                        <Tag color='#87d068'>合理</Tag>
                      ) : (
                        <Tag color='#f50'>不合理</Tag>
                      )}
                    </h3>
                    <Divider />
                    <h5 className='result-describe'>
                      {this.props.voluntaryResult.gradedResult.describe}
                    </h5>
                    {this.props.voluntaryResult.gradedResult.gradedDetailArr.map(
                      item => (
                        <p key={item}>{item}</p>
                      )
                    )}
                    <ReactEcharts
                      option={this.getOption(
                        this.props.voluntaryResult.gradedResult.schoolScoreArr
                      )}
                      style={{ height: '350px' }}
                      className='questionnaire-chart'
                    />
                  </div>
                ) : (
                  <Skeleton />
                )}
              </h3>
            </div>
            <div>
              {this.props.voluntaryResult.planResult ? (
                <div>
                  <Divider />
                  <h3 className='voluntary-result-title'>
                    <span>大计划选择合理性</span>
                    {this.props.voluntaryResult.planResult.reasonable ? (
                      <Tag color='#87d068'>合理</Tag>
                    ) : (
                      <Tag color='#f50'>不合理</Tag>
                    )}
                  </h3>
                  <Divider />
                  <h5 className='result-describe'>
                    {this.props.voluntaryResult.planResult.describe}
                  </h5>
                  {this.props.voluntaryResult.planResult.planDetailArr.map(
                    item => (
                      <p key={item}>{item}</p>
                    )
                  )}
                </div>
              ) : (
                <Skeleton />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
// 从store接收state数据
const mapStateToProps = store => {
  const voluntaryStore = store['voluntaryStore'];
  let { voluntaryResult } = voluntaryStore;

  return {
    voluntaryResult
  };
};

// 向store dispatch action
const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VoluntaryResultController);
