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
    // 根据学校名批次,科系,
    this.props.recordSchoolList(3);
  }
  handleChangeName = (e) => {
    this.props.recordschoolName(e.target.value);
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
    recordschoolName: params => {
      dispatch(voluntaryActions.recordschoolName(params));
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
