import React from 'react';
import { withRouter } from 'react-router-dom';

// UI组件
import { Table, Button } from 'antd';

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
    deepVoluntary: []
  };
  render() {
    return (
      <div style={{display: 'flex'}}>
        <Table
          dataSource={this.state.reportVoluntary}
          rowKey={record => record.uuid}
          style={{width: '50%'}}
        >
          <Column
            title='报表志愿提交时间'
            dataIndex='submit_time'
            key='submit_time'
          />
          <Column title='志愿批次' dataIndex='lots_name' />
          <Column title='志愿考试年份' dataIndex='year' />
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
        <Table
          dataSource={this.state.deepVoluntary}
          rowKey={record => record.uuid}
          style={{width: '50%'}}
        >
          <Column
            title='深度体验提交时间'
            dataIndex='submit_time'
            key='submit_time'
          />
          <Column title='志愿批次' dataIndex='lots_name' />
          <Column title='志愿考试年份' dataIndex='year' />
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
      </div>
    );
  }

  // 查询自己的所有志愿
  componentDidMount = async () => {
    let myVoluntary = await launchRequest(GET_MY_VOLUNTARY);
    
    let reportVoluntary = myVoluntary.filter(item => item.reportType === 1);
    let deepVoluntary = myVoluntary.filter(item => item.reportType === 2);

    this.setState({
      reportVoluntary,
      deepVoluntary
    });
  };

  handleClickVoluntaryResut = voluntaryId => {
    // 将uuid存入redux
    this.props.recordVoluntaryIdGetResult(voluntaryId);
    // 跳转页面
    this.props.history.push(`/${BCG_ROOT_NAME}/${VOLUNTARY_RESULT.path}`);
  };

  handleClickDeepResut = voluntaryId => {
    this.props.recordVoluntaryListOption(voluntaryId);
    this.props.recordVoluntaryDeepUuid(voluntaryId);
    this.props.history.push(`/${BCG_ROOT_NAME}/${VOLUNTARY_DEEP_RESULT.path}`);
  }
}

// 从store接收state数据
const mapStateToProps = store => {
  const voluntaryStore = store['voluntaryStore'];
  let { lot_id, voluntary } = voluntaryStore;

  return {
    lotId: lot_id,
    voluntary: [...voluntary]
  };
};

// 向store dispatch action
const mapDispatchToProps = dispatch => {
  return {
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
