import React from 'react';

// UI组件
import { Radio } from 'antd';

// 自定义组件
import TableController from './table-controller';
import SchoolOptionsController from './school-options-controller.jsx';

// 请求文件
import { launchRequest } from '../../../../util/request';
import * as APIS from '../../../../constants/api-constants';

// 关于数据模块交互
import { connect } from 'react-redux';
import { actions as voluntaryActions } from '../../../../redux/voluntary-model';

class SchoolFirstController extends React.Component {
  render() {
    return (
      <div>
        <SchoolOptionsController />
        <TableController />
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {}
};

// 从store接收state数据
const mapStateToProps = store => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SchoolFirstController);
