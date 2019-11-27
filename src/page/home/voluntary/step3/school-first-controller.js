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
  state = {
    gatherOptionList: []
  };
  render() {
    return (
      <div>
        <SchoolOptionsController />
        <Radio.Group
          className='school-first-btn-group'
          value={this.props.gatherValue}
          onChange={this.handleGatherChange}
        >
          {this.state.gatherOptionList.map(item => (
            <Radio.Button key={item.value} className='btn' value={item.value}>
              {item.name}
            </Radio.Button>
          ))}
        </Radio.Group>
        <span className='school-first-alert-box'>
          *
          {this.state.gatherOptionList.find(
            gather => gather.value === this.props.gatherValue
          )
            ? this.state.gatherOptionList.find(
                gather => gather.value === this.props.gatherValue
              ).describe
            : undefined}
        </span>
        <TableController />
      </div>
    );
  }

  componentDidMount = async () => {
    this.props.recordSchoolList();
    
    let { gatherOptionList } = await launchRequest(APIS.GET_SCHOOL_OPTION, {
      lotId: this.props.lotId
    });

    await this.setState({
      gatherOptionList
    });
  };

  // 改变集合
  handleGatherChange = async e => {
    this.props.recordSchoolOption({ gatherValue: e.target.value });
  };
}
const mapDispatchToProps = dispatch => {
  return {
    recordSchoolOption: params => {
      dispatch(voluntaryActions.recordSchoolOption(params));
      dispatch(voluntaryActions.recordSchoolList());
    },
    recordSchoolList: () => {
      dispatch(voluntaryActions.recordSchoolList());
    }
  };
};

// 从store接收state数据
const mapStateToProps = store => {
  const voluntaryStore = store['voluntaryStore'];
  let { lot_id, voluntary, schoolOption } = voluntaryStore;
  let { gatherValue } = schoolOption;
  return {
    lotId: lot_id,
    voluntary: [...voluntary],
    gatherValue
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SchoolFirstController);
