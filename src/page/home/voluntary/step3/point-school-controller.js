import React from 'react';

// UI组件
import {
  Input,
} from 'antd';

// 自定义组件
import TableController from './table-controller';

const { Search } = Input;

class PointSchoolController extends React.Component {
  render() {
    return (
      <div>
        <div>
          <Search
            enterButton='搜索学校'
            size='large'
            onSearch={this.searchSchool}
          />
        </div>
        <TableController />
      </div>
    );
  }
}
export default PointSchoolController;
