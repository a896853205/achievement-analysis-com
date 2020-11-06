import React from 'react';

// 自定义组件
import TableController from './table-controller';
import SchoolOptionsController from './school-options-controller.jsx';
import FuzzySelectMajor from './component/fuzzy-select/fuzzy-select-major-component';

class MajorFirstController extends React.Component {
  render() {
    return (
      <div>
        <div>
          <FuzzySelectMajor />
        </div>
        <SchoolOptionsController />
        <TableController />
      </div>
    );
  }
}

export default MajorFirstController;
