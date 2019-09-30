import React from 'react';

// UI组件
import {
  Input,
} from 'antd';

// 自定义组件
import TableController from './table-controller';

const { Search } = Input;

class MajorFirstController extends React.Component {
  render() {
    return (
      <div>
        <div>
          <Search
            enterButton='搜索专业'
            size='large'
            onSearch={this.searchMajor}
          />
        </div>
        <TableController />
      </div>
    );
  }
}
export default MajorFirstController;