import React from 'react';
import ReactEcharts from 'echarts-for-react';
// 请求文件
import { launchRequest } from '../../../util/request';
import * as APIS from '../../../constants/api-constants';

import '../../../style/questionnaire/result.css';

import { Skeleton } from 'antd';

const maxRank = 10;
class ResultController extends React.Component {
  state = {
    loading: true,
    result: [],
    maxDescribe: []
  };
  getOption = result => {
    const option = {
      tooltip: {},
      radar: {
        // shape: 'circle',
        name: {
          textStyle: {
            color: '#fff',
            backgroundColor: '#999',
            borderRadius: 3,
            padding: [3, 5]
          }
        },
        indicator: []
      },
      series: [
        {
          name: '类型',
          type: 'radar',
          itemStyle: {
            color: '#4091f7',
            borderColor: '#4091f7'
          },
          areaStyle: {
            color: '#4091f7',
            borderColor: '#4091f7'
          },
          data: [
            {
              value: [],
              name: '专业测评结果'
            }
          ]
        }
      ]
    };
    result.forEach(item => {
      option.radar.indicator.push({ name: item.typeName, max: maxRank });
      option.series[0].data[0].value.push(item.rank);
    });

    return option;
  };
  render() {
    return (
      <div className='result-box'>
        <div className='result-content-box'>
          {this.state.loading ? (
            <Skeleton />
          ) : (
            <div className='result-content'>
              <ReactEcharts
                option={this.getOption(this.state.result)}
                style={{ height: '350px' }}
                className='questionnaire-chart'
              />
              <div className='max-describe'>
                {this.state.maxDescribe.map(item => (
                  <div key={item.typeCode}>
                    <h5>{item.typeName}</h5>
                    <p>职业类型: {item.typicalCarrer}</p>
                    <p>匹配专业: {item.matchMajor}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
  componentDidMount = async () => {
    let { returnResult } = await launchRequest(APIS.GET_QUESTIONNAIRE_RANK);

    let maxScorce = 0,
      maxDescribe = [];

    returnResult.forEach(item => {
      if (item.rank > maxScorce) {
        maxScorce = item.rank;
      }
    });

    maxDescribe = returnResult.filter(item => {
      return item.rank === maxScorce;
    });

    await this.setState({
      loading: false,
      result: returnResult,
      maxDescribe
    });
  };
}
export default ResultController;
