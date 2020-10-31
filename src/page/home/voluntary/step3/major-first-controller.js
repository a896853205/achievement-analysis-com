import React from 'react';

// UI组件
import { Input } from 'antd';

// 自定义组件
import TableController from './table-controller';
import SchoolOptionsController from './school-options-controller.jsx';

// 关于数据模块交互
import { connect } from 'react-redux';
import { actions as voluntaryActions } from '../../../../redux/voluntary-model';

const { Search } = Input;

class MajorFirstController extends React.Component {
  render() {
    return (
      <div>
        <div>
          {/* TODO: 搜索专业 */}
          <Search
            enterButton='搜索专业'
            size='large'
            onSearch={this.handleSearchMajor}
            onChange={this.handleChangeName}
            placeholder='请输入专业名称'
          />
        </div>
        <SchoolOptionsController />
        <TableController />
      </div>
    );
  }

  // 搜专业名
  handleSearchMajor = () => {
    this.props.recordSchoolList();
  };
  handleChangeName = e => {
    this.props.recordMajorName(e.target.value);
  };
}

// 从store接收state数据
const mapStateToProps = store => {
  return {};
};

// 向store dispatch action
const mapDispatchToProps = dispatch => {
  return {
    recordMajorName: params => {
      dispatch(voluntaryActions.recordMajorName(params));
    },
    recordSchoolList: () => {
      dispatch(voluntaryActions.recordSchoolList());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MajorFirstController);
