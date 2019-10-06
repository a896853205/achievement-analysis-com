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
  VOLUNTARY_RESULT
} from '../../../constants/route-constants';

const { Column } = Table;
class MyVoluntaryController extends React.Component {
  state = {
    myVoluntary: []
  };
  render() {
    return (
      <div>
        <Table
          dataSource={this.state.myVoluntary}
          rowKey={record => record.uuid}
        >
          <Column
            title='志愿提交时间'
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
      </div>
    );
  }

  // 查询自己的所有志愿
  componentDidMount = async () => {
    let myVoluntary = await launchRequest(GET_MY_VOLUNTARY);

    this.setState({
      myVoluntary
    });
  };

  handleClickVoluntaryResut = voluntaryId => {
    // 将uuid存入redux
    this.props.recordVoluntaryIdGetResult(voluntaryId);
    // 跳转页面
    this.props.history.push(`/${BCG_ROOT_NAME}/${VOLUNTARY_RESULT.path}`);
  };
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
    }
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(MyVoluntaryController)
);
