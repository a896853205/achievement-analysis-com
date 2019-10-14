import React from 'react';
import ReactEcharts from 'echarts-for-react';

// UI组件
import { Cascader } from 'antd';

// css
import '@/style/result/deep-result.css';
// 关于数据模块交互
import { connect } from 'react-redux';

// 请求文件
import { launchRequest } from '@/util/request';
import * as APIS from '@/constants/api-constants';

class ResultDeepAnalysisController extends React.Component {
  state = {
    professionalKnowledge: {
      professionalKnowledgeNotSatisfaction: 0,
      professionalKnowledgeSatisfaction: 0,
      professionalKnowledgeSuperSatisfaction: 0
    },
    jobAdaptability: {
      jobAdaptabilityNotSatisfaction: 0,
      jobAdaptabilitySatisfaction: 0,
      jobAdaptabilitySuperSatisfaction: 0
    },
    area: {
      top1AreaName: '',
      top1AreaRate: 0,
      top2AreaName: '',
      top2AreaRate: 0,
      top3AreaName: '',
      top3AreaRate: 0,
      top4AreaName: '',
      top4AreaRate: 0,
      top5AreaName: '',
      top5AreaRate: 0
    },
    employment: {
      top1EmploymentName: '',
      top1EmploymentRate: 0,
      top2EmploymentName: '',
      top2EmploymentRate: 0,
      top3EmploymentName: '',
      top3EmploymentRate: 0,
      top4EmploymentName: '',
      top4EmploymentRate: 0,
      top5EmploymentName: '',
      top5EmploymentRate: 0
    },
    people: {
      abroadNumber: 0,
      employmentNumber: 0,
      enterNumber: 0,
      totalPeopleNumber: 0
    }
  };
  render() {
    return (
      <div style={{ padding: '20px' }}>
        <div>
          <h2>请选择志愿中的学校的专业</h2>
          <Cascader
            options={this.props.voluntaryListOption}
            onChange={this.handleChangeSchoolMajor}
            style={{ width: '100%' }}
            placeholder='请选择志愿中的学校的专业'
          />
        </div>
        <div className='deep-charts-box'>
          <div className='deep-charts-item'>
            <ReactEcharts
              option={this.getProfessionalKnowledgeOption(
                this.state.professionalKnowledge
              )}
              style={{ height: '350px' }}
            />
          </div>
          <div className='deep-charts-item'>
            <ReactEcharts
              option={this.getJobAdaptabilityOption(this.state.jobAdaptability)}
              style={{ height: '350px' }}
            />
          </div>
          <div className='deep-charts-item'>
            <ReactEcharts
              option={this.getEmploymentOption(this.state.employment)}
              style={{ height: '350px' }}
            />
          </div>
          <div className='deep-charts-item'>
            <ReactEcharts
              option={this.getAreaOption(this.state.area)}
              style={{ height: '350px' }}
            />
          </div>
          <div className='deep-charts-item'>
            <ReactEcharts
              option={this.getPeopleOption(this.state.people)}
              style={{ height: '350px' }}
            />
          </div>
        </div>
      </div>
    );
  }

  handleChangeSchoolMajor = async value => {
    let [voluntarieerId, majorIndex] = value;
    let data = {};

    if (voluntarieerId !== undefined && majorIndex !== undefined) {
      data = await launchRequest(APIS.GET_VOLUNTARY_DEEP_RESULT, {
        voluntaryUuid: this.props.voluntaryDeepUuid,
        voluntarieerId,
        majorIndex
      });
    }

    if (data.unitSatisfactionObj) {
      this.setState({
        professionalKnowledge: data.unitSatisfactionObj,
        jobAdaptability: data.unitSatisfactionObj
      });
    }

    if (data.majorFutureObj) {
      this.setState({
        area: data.majorFutureObj,
        employment: data.majorFutureObj,
        people: data.majorFutureObj
      });
    }

    /**
     * majorFutureObj:
     * 
     * abroadNumber: 20
     * abroadRate: 0.012
     * analysisId: 19
     * disciplineCode: "0201"
     * employmentNumber: 1279
     * employmentRate: 0.7696
     * enterNumber: 100
     * enterRate: 0.0602
     * id: 4362
     * top1AreaName: "黑龙江省"
     * top1AreaRate: 0.5449
     * top1EmploymentName: "金融业"
     * top1EmploymentRate: 0.2359
     * top2AreaName: "甘肃省"
     * top2AreaRate: 0.0559
     * top2EmploymentName: "批发和零售业"
     * top2EmploymentRate: 0.1364
     * top3AreaName: "安徽省"
     * top3AreaRate: 0.0449
     * top3EmploymentName: "信息传输、软件和信息技术服务业"
     * top3EmploymentRate: 0.0835
     * top4AreaName: "河南省"
     * top4AreaRate: 0.0429
     * top4EmploymentName: "制造业"
     * top4EmploymentRate: 0.0737
     * top5AreaName: "内蒙古"
     * top5AreaRate: 0.0364
     * top5EmploymentName: "教育"
     * top5EmploymentRate: 0.0663
     * totalPeopleNumber: 1662

       unitSatisfactionObj:

       analysisId: 19
       id: 99
       jobAdaptabilityNotSatisfaction: 0.005
       jobAdaptabilitySatisfaction: 0.3204
       jobAdaptabilitySuperSatisfaction: 0.6743
       professionalKnowledgeNotSatisfaction: 0.0077
       professionalKnowledgeSatisfaction: 0.2967
       professionalKnowledgeSuperSatisfaction: 0.6957
     */
  };

  /**
   * 专业知识满意度获取option函数
   */
  getProfessionalKnowledgeOption = professionalKnowledge => {
    const option = {
      title: {
        text: '专业知识满意度',
        subtext: '这里放对专业知识满意度的解释',
        x: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{b} : {d}%'
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: ['专业知识非常满意占比', '专业知识满意占比', '专业知识不满意占比']
      },
      series: [
        {
          name: '专业知识满意度',
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          data: [
            {
              value:
                professionalKnowledge.professionalKnowledgeSuperSatisfaction,
              name: '专业知识非常满意占比'
            },
            {
              value: professionalKnowledge.professionalKnowledgeSatisfaction,
              name: '专业知识满意占比'
            },
            {
              value: professionalKnowledge.professionalKnowledgeNotSatisfaction,
              name: '专业知识不满意占比'
            }
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };

    return option;
  };

  /**
   * 工作适应度满意度获取option函数
   */
  getJobAdaptabilityOption = jobAdaptability => {
    const option = {
      title: {
        text: '工作适应度满意度',
        subtext: '这里放对工作适应度满意度的解释',
        x: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{b} : {d}%'
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: [
          '工作适应度非常满意占比',
          '工作适应度满意占比',
          '工作适应度不满意占比'
        ]
      },
      series: [
        {
          name: '工作适应度满意度',
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          data: [
            {
              value: jobAdaptability.jobAdaptabilitySuperSatisfaction,
              name: '工作适应度非常满意占比'
            },
            {
              value: jobAdaptability.jobAdaptabilitySatisfaction,
              name: '工作适应度满意占比'
            },
            {
              value: jobAdaptability.jobAdaptabilityNotSatisfaction,
              name: '工作适应度不满意占比'
            }
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };

    return option;
  };

  /**
   * 就业地区比例获取option函数
   */
  getAreaOption = area => {
    const option = {
      title: {
        text: '就业地区比例',
        subtext: '就业地区比例介绍'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        },
        formatter: '{b} : {c}%'
      },
      legend: {
        data: ['就业地区比例']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'value',
        boundaryGap: [0, 0.01],
        max: 100
      },
      yAxis: {
        type: 'category',
        data: [
          area.top1AreaName,
          area.top2AreaName,
          area.top3AreaName,
          area.top4AreaName,
          area.top5AreaName
        ]
      },
      series: [
        {
          name: '就业地区比例',
          type: 'bar',
          data: [
            (area.top1AreaRate * 100).toFixed(2),
            (area.top2AreaRate * 100).toFixed(2),
            (area.top3AreaRate * 100).toFixed(2),
            (area.top4AreaRate * 100).toFixed(2),
            (area.top5AreaRate * 100).toFixed(2)
          ]
        }
      ]
    };

    return option;
  };

  /**
   * 就业行业比例获取option函数
   */
  getEmploymentOption = employment => {
    const option = {
      title: {
        text: '就业行业比例',
        subtext: '就业行业介绍'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        },
        formatter: '{b} : {c}%'
      },
      legend: {
        data: ['就业行业比例']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'value',
        boundaryGap: [0, 0.01],
        max: 100
      },
      yAxis: {
        type: 'category',
        data: [
          employment.top1EmploymentName,
          employment.top2EmploymentName,
          employment.top3EmploymentName,
          employment.top4EmploymentName,
          employment.top5EmploymentName
        ]
      },
      series: [
        {
          name: '就业行业比例',
          type: 'bar',
          data: [
            (employment.top1EmploymentRate * 100).toFixed(2),
            (employment.top2EmploymentRate * 100).toFixed(2),
            (employment.top3EmploymentRate * 100).toFixed(2),
            (employment.top4EmploymentRate * 100).toFixed(2),
            (employment.top5EmploymentRate * 100).toFixed(2)
          ]
        }
      ]
    };

    return option;
  };

  /**
   * 人员去向获取option函数
   */
  getPeopleOption = people => {
    const option = {
      title: {
        text: '人员去向',
        subtext: '人员去向的解释',
        x: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{b} : {d}%'
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: ['出国留学', '实际就业', '考研升学', '其他']
      },
      series: [
        {
          name: '人员去向',
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          data: [
            {
              value: people.abroadNumber,
              name: '出国留学'
            },
            {
              value: people.employmentNumber,
              name: '实际就业'
            },
            {
              value: people.enterNumber,
              name: '考研升学'
            },
            {
              value:
                people.totalPeopleNumber -
                people.abroadNumber -
                people.employmentNumber -
                people.enterNumber,
              name: '其他'
            }
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };

    return option;
  };
}
// 从store接收state数据
const mapStateToProps = store => {
  const voluntaryStore = store['voluntaryStore'];
  let { voluntaryListOption, voluntaryDeepUuid } = voluntaryStore;

  return {
    voluntaryListOption,
    voluntaryDeepUuid
  };
};

// 向store dispatch action
const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResultDeepAnalysisController);
