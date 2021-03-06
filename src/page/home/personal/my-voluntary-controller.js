import React from 'react';
import { withRouter } from 'react-router-dom';

// UI组件
import { Table, Button,Spin,message } from 'antd';

// 请求
import { launchRequest } from '@/util/request';
import { GET_MY_VOLUNTARY } from '@/constants/api-constants';

// 关于数据模块交互
import { connect } from 'react-redux';
import { actions as voluntaryActions } from '../../../redux/voluntary-model';

// 路由
import {
  BCG_ROOT_NAME,
  VOLUNTARY_RESULT,
  VOLUNTARY_DEEP_RESULT
} from '../../../constants/route-constants';

const { Column } = Table;
class MyVoluntaryController extends React.Component {
  state = {
    reportVoluntary: [],
    deepVoluntary: [],
    btnLoading:false
  };
  render() {
    return (
      <div style={{ display: 'flex' }}>
        <div style={{ width: '50%' }}>
          <Spin
            tip='数据加载中'
            delay={200}
            spinning={this.state.btnLoading}
          >
            <Table
              dataSource={this.state.reportVoluntary}
              rowKey={record => record.uuid}
            >
              <Column
                title='报表志愿提交时间'
                dataIndex='submit_time'
                key='submit_time'
                render={(text, record) => (
                  <span>
                {record.submit_time.slice(0, 16)}
              </span>
                )}
              />
              <Column
                title='志愿批次'
                dataIndex='lots_name'
                render={(text, record) => (
                  <span>{record.lots_name === '三批' ? '二批A' : record.lots_name}</span>
                )}
              />
              <Column title='志愿考试年份' dataIndex='year'/>
              <Column
                title='操作'
                dataIndex='showResult'
                render={(text, record) => (
                  <Button
                    color='blue'
                    onClick={() => {
                      this.handleClickVoluntaryResut(record.uuid);
                    }}
                  >
                    查看报表
                  </Button>
                )}
              />
            </Table>
          </Spin>
        </div>
        <div style={{ width: '50%' }}>
          <Spin
            tip='数据加载中'
            delay={200}
            spinning={this.state.btnLoading}
          >
            <Table
              dataSource={this.state.deepVoluntary}
              rowKey={record => record.uuid}
            >
              <Column
                title='深度体验提交时间'
                dataIndex='submit_time'
                key='submit_time'
                render={(text, record) => (
                  <span>
                {record.submit_time.slice(0, 16)}
              </span>
                )}
              />
              <Column
                title='志愿批次'
                dataIndex='lots_name'
                render={(text, record) => (
                  <span>{record.lots_name === '三批' ? '二批A' : record.lots_name}</span>
                )}
              />
              <Column title='志愿考试年份' dataIndex='year'/>
              <Column
                title='操作'
                dataIndex='showResult'
                render={(text, record) => (
                  <Button
                    color='blue'
                    onClick={() => {
                      this.handleClickDeepResut(record.uuid);
                    }}
                  >
                    查看深度体验
                  </Button>
                )}
              />
            </Table>
          </Spin>
        </div>
      </div>
    );
  }

  // 查询自己的所有志愿
  componentDidMount = async () => {
    this.setState({
      btnLoading: true
    });
    launchRequest(GET_MY_VOLUNTARY).then(myVoluntary=>{
      if(myVoluntary){
        let reportVoluntary = myVoluntary.filter(item => item.reportType === 1);
        let deepVoluntary = myVoluntary.filter(item => item.reportType === 2);
        this.setState({
          reportVoluntary,
          deepVoluntary,
          btnLoading: false
        });
      }
    }).catch(err=>{
      console.log(err);
      this.setState({
        btnLoading: false
      });
      message.error('数据获取失败，请刷新重试');
    });
    



  };

  handleClickVoluntaryResut = voluntaryId => {
    this.props.recordVoluntarySchoolAndMajorUuid(voluntaryId);
    // 将uuid存入redux
    this.props.recordVoluntaryIdGetResult(voluntaryId);
    // 跳转页面
    this.props.history.push(`/${BCG_ROOT_NAME}/${VOLUNTARY_RESULT.path}?from=${voluntaryId}`);
  };

  handleClickDeepResut = voluntaryId => {
    this.props.recordVoluntaryListOption(voluntaryId);
    this.props.recordVoluntaryDeepUuid(voluntaryId);
    this.props.history.push(`/${BCG_ROOT_NAME}/${VOLUNTARY_DEEP_RESULT.path}/${voluntaryId}`);
  }
}

// 从store接收state数据
const mapStateToProps = store => {
  const voluntaryStore = store['voluntaryStore'];
  let { lot_id, voluntary, schoolAndMajorUuid } = voluntaryStore;

  return {
    lotId: lot_id,
    voluntary: [...voluntary],
    schoolAndMajorUuid
  };
};

// 向store dispatch action
const mapDispatchToProps = dispatch => {
  return {
    recordVoluntarySchoolAndMajorUuid: params => {
      dispatch(voluntaryActions.recordVoluntarySchoolAndMajorUuid(params));
    },
    recordVoluntaryIdGetResult: params => {
      dispatch(voluntaryActions.recordVoluntaryIdGetResult(params));
    },
    recordVoluntaryDeepUuid: params => {
      dispatch(voluntaryActions.recordVoluntaryDeepUuid(params));
    },
    recordVoluntaryListOption: params => {
      dispatch(voluntaryActions.recordVoluntaryListOption(params));
    }
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(MyVoluntaryController)
);
