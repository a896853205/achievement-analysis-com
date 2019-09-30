import React from 'react';

// UI组件
import {
  Input,
} from 'antd';

// 自定义组件
import TableController from './table-controller';

// 关于数据模块交互
import { connect } from 'react-redux';
import { actions as voluntaryActions } from '../../../../redux/voluntary-model';

const { Search } = Input;

class PointSchoolController extends React.Component {
  render() {
    return (
      <div>
        <div>
          <Search
            enterButton='搜索学校'
            size='large'
            onSearch={this.handleSearchSchool}
            onChange={this.handleChangeName}
          />
        </div>
        <TableController />
      </div>
    );
  }

  // 搜索学校名
  handleSearchSchool = () => {
    this.props.recordSchoolList(3);
  }
  handleChangeName = (e) => {
    this.props.recordSchoolName(e.target.value);
  }
}

// 从store接收state数据
const mapStateToProps = store => {
  const voluntaryStore = store['voluntaryStore'];
  let { schoolName } = voluntaryStore;

  return {
    schoolName
  };
};

// 向store dispatch action
const mapDispatchToProps = dispatch => {
  return {
    recordSchoolName: params => {
      dispatch(voluntaryActions.recordSchoolName(params));
    },
    recordSchoolList: type =>{
      dispatch(voluntaryActions.recordSchoolList(type));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PointSchoolController);
